import { NetworkVersion } from './networkVersions';
import { CryptoUtil } from '../utils/cryptoUtil';

export interface BitcoinAddressConstructorOptions {
    publicKey: Buffer;
    version: NetworkVersion;
}

export class BitcoinAddress {
    private _publicKey: Buffer;
    private _rawAddress?: Buffer;
    private _address?: string;
    private _version: NetworkVersion;

    private constructor({ publicKey, version }: BitcoinAddressConstructorOptions) {
        const length = publicKey.length;
        const firstByte = publicKey[0];
        if ((length !== 33 && length !== 65) || firstByte < 2 || firstByte > 4) {
            throw new Error('invalid public key');
        }
        this._publicKey = publicKey;
        this._version = version;
    }

    static from(publicKey: Buffer, version: NetworkVersion): BitcoinAddress {
        return new BitcoinAddress({ publicKey, version });
    }

    get publicKey(): Buffer {
        return this._publicKey;
    }

    get rawAddress(): Buffer {
        if (!this._rawAddress) {
            const hash = CryptoUtil.sha256Ripemd160(this._publicKey);
            const prefixedHash = Buffer.alloc(1 + hash.length);
            prefixedHash.writeUInt8(this._version.public, 0);
            hash.copy(prefixedHash, 1);
            const checksum = CryptoUtil.sha256Sha256(prefixedHash).slice(0, 4);
            this._rawAddress = Buffer.concat([prefixedHash, checksum]);
        }
        return this._rawAddress;
    }

    get address_p2pkh(): string {
        if (!this._address) {
            this._address = CryptoUtil.encodeBs58(this.rawAddress);
        }
        return this._address;
    }

    get address_p2wpkh(): string {
        const hash = CryptoUtil.sha256Ripemd160(this._publicKey);
        return CryptoUtil.encodeBech32(hash, this._version.bech32Prefix);
    }
}
