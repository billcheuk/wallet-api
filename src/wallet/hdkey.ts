import BN from 'bn.js';
import { ec as EC } from 'elliptic';
import { CryptoUtil } from '../utils/cryptoUtil';

const HARDENED_KEY_OFFSET = 0x80000000; // 2^31

const secp256k1 = new EC('secp256k1');

export interface HDKeyConstructorOptions {
    chainCode: Buffer;
    privateKey?: Buffer | null;
    publicKey?: Buffer | null;
    index?: number;
    depth?: number;
    parentFingerprint?: Buffer;
}

export class HDKey {
    private readonly _privateKey: Buffer | null = null;
    private readonly _publicKey: Buffer;
    private readonly _chainCode: Buffer;
    private readonly _index: number;
    private readonly _depth: number;
    private readonly _parentFingerprint: Buffer;
    private readonly _keyIdentifier: Buffer;

    constructor({ privateKey, publicKey, chainCode, index, depth, parentFingerprint }: HDKeyConstructorOptions) {
        if (!privateKey && !publicKey) {
            throw new Error('either private key or public key must be provided');
        }

        if (privateKey) {
            this._privateKey = privateKey;
            this._publicKey = this.publicFromPrivateKey(privateKey);
        } else {
            this._publicKey = publicKey as Buffer;
        }

        this._chainCode = chainCode;
        this._depth = depth || 0;
        this._index = index || 0;
        this._parentFingerprint = parentFingerprint || Buffer.alloc(4);
        this._keyIdentifier = CryptoUtil.sha256Ripemd160(this._publicKey);
    }

    public static parseMasterSeed(seed: string): HDKey {
        const seedBuf: Buffer = Buffer.from(seed, 'hex');

        if (seedBuf.length < 16) throw new Error('invalid seed: seed should be at least 128 bits');
        if (seedBuf.length > 64) throw new Error('invalid seed: seed should be at most 512 bits');

        const keyBuf: Buffer = Buffer.from('Bitcoin seed', 'utf-8');
        return this.parseSeedWithKey(keyBuf, seedBuf);
    }

    private static parseSeedWithKey(key: Buffer, seed: Buffer): HDKey {
        const i = CryptoUtil.hmacSha512(key, seed);
        const iL = i.slice(0, 32);
        const iR = i.slice(32);
        return new HDKey({ privateKey: iL, chainCode: iR });
    }

    public get privateKey(): Buffer | null {
        return this._privateKey || null;
    }

    public get publicKey(): Buffer {
        return this._publicKey;
    }

    public get chainCode(): Buffer {
        return this._chainCode;
    }

    public get depth(): number {
        return this._depth;
    }

    public get parentFingerprint(): Buffer {
        return this._parentFingerprint;
    }

    public get index(): number {
        return this._index;
    }

    public get keyIdentifier(): Buffer {
        return this._keyIdentifier;
    }

    public get fingerprint(): Buffer {
        return this._keyIdentifier.slice(0, 4);
    }

    public derive(hdPath: string): HDKey {
        const c = hdPath.toLowerCase();

        if (!c.startsWith('m')) throw new Error(`invalid path: ${hdPath} should be started with m`);

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let childKey: HDKey = this;
        c.split('/').forEach((path) => {
            const p = path.trim();
            if (p === 'm' || p === "m'" || p === '') {
                return;
            }
            const index = Number.parseInt(p, 10);
            if (Number.isNaN(index)) {
                throw new Error(`invalid child key derivation chain: ${index}`);
            }
            const hardened = p.slice(-1) === "'";
            childKey = childKey.deriveChildKey(index, hardened);
        });

        return childKey;
    }

    private deriveChildKey(childIndex: number, hardened: boolean): HDKey {
        if (childIndex >= HARDENED_KEY_OFFSET) {
            throw new Error('invalid index');
        }
        if (!this.privateKey && !this.publicKey) {
            throw new Error('either private key or public key must be provided');
        }

        let index = childIndex;
        const data = Buffer.alloc(37);
        let offset = 0;

        if (hardened) {
            if (!this.privateKey) {
                throw new Error('cannot derive a hardened child key from a public key');
            }
            index += HARDENED_KEY_OFFSET;
            offset += 1;
            offset += this.privateKey.copy(data, offset);
        } else {
            offset += this.publicKey.copy(data, offset);
        }
        offset += data.writeUInt32BE(index, offset);

        const i = CryptoUtil.hmacSha512(this.chainCode, data);
        const iL = new BN(i.slice(0, 32));
        const iR = i.slice(32);

        if (iL.cmp(secp256k1.n as BN) >= 0) {
            return this.deriveChildKey(childIndex + 1, hardened);
        }

        if (this.privateKey) {
            const childKey = iL.add(new BN(this.privateKey)).mod(secp256k1.n as BN);
            if (childKey.cmp(new BN(0)) === 0) {
                return this.deriveChildKey(childIndex + 1, hardened);
            }

            return new HDKey({
                privateKey: childKey.toArrayLike(Buffer, 'be', 32),
                chainCode: iR,
                index,
                parentFingerprint: this.fingerprint,
                depth: this.depth + 1,
            });
        } else {
            const parentKey = secp256k1.keyFromPublic(this.publicKey).getPublic;
            const childKey = secp256k1.g.mul(iL).add(parentKey);
            if (childKey.isInfinity()) {
                return this.deriveChildKey(childIndex + 1, false);
            }
            const compressedChildKey = Buffer.from(childKey.encode(null, true));

            return new HDKey({
                depth: this.depth + 1,
                publicKey: compressedChildKey,
                chainCode: iR,
                parentFingerprint: this.fingerprint,
                index,
            });
        }
    }

    private publicFromPrivateKey(privateKey: Buffer): Buffer {
        const publicKey: string = secp256k1.keyFromPrivate(privateKey).getPublic(true, 'hex');
        return Buffer.from(publicKey, 'hex');
    }
}
