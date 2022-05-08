import { validateM } from '../utils/validator';
import { CryptoUtil } from '../utils/cryptoUtil';

enum OpCodeValue {
    OP_0 = 0x00,
    OP_1 = 0x51,
    OP_PUSHDATA1 = 0x4c,
    OP_PUSHDATA2 = 0x4d,
    OP_PUSHDATA4 = 0x4e,
    OP_CHECKMULTISIG = 0xae,
}

interface ScriptChunk {
    buf?: Buffer;
    len?: number;
    opCodeNum: number;
}

export class BitcoinP2msScript {
    private chunks: ScriptChunk[] = [];

    constructor(m: number, pubKeys: string[]) {
        validateM(m, pubKeys);
        this.writeOpCode(m + OpCodeValue.OP_1 - 1);
        for (const i in pubKeys) {
            const pubKeyInBuffer = Buffer.from(pubKeys[i], 'hex');
            this.writeBuffer(pubKeyInBuffer);
        }
        this.writeOpCode(pubKeys.length + OpCodeValue.OP_1 - 1);
        this.writeOpCode(OpCodeValue.OP_CHECKMULTISIG);
    }

    private writeOpCode(opCodeNum: number) {
        this.chunks.push({ opCodeNum });
    }

    private writeBuffer(buf: Buffer) {
        let opCodeNum;
        const len = buf.length;
        if (buf.length > 0 && buf.length < OpCodeValue.OP_PUSHDATA1) {
            opCodeNum = buf.length;
        } else if (buf.length === 0) {
            opCodeNum = OpCodeValue.OP_0;
        } else if (buf.length < Math.pow(2, 8)) {
            opCodeNum = OpCodeValue.OP_PUSHDATA1;
        } else if (buf.length < Math.pow(2, 16)) {
            opCodeNum = OpCodeValue.OP_PUSHDATA2;
        } else if (buf.length < Math.pow(2, 32)) {
            opCodeNum = OpCodeValue.OP_PUSHDATA4;
        } else {
            throw new Error("You can't push that much data");
        }
        this.chunks.push({
            buf,
            len,
            opCodeNum,
        });
    }

    private toBuffer(): Buffer {
        const bufs: Buffer[] = [];
        let buf: Buffer;

        for (let i = 0; i < this.chunks.length; i++) {
            const chunk = this.chunks[i];
            const opCodeNum = chunk.opCodeNum;
            buf = Buffer.alloc(1);
            buf.writeUInt8(opCodeNum, 0);
            bufs.push(buf);
            if (chunk.buf) {
                if (opCodeNum < OpCodeValue.OP_PUSHDATA1) {
                    bufs.push(chunk.buf);
                } else if (opCodeNum === OpCodeValue.OP_PUSHDATA1) {
                    buf = Buffer.alloc(1);
                    buf.writeUInt8(chunk.len as number, 0);
                    bufs.push(buf);
                    bufs.push(chunk.buf);
                } else if (opCodeNum === OpCodeValue.OP_PUSHDATA2) {
                    buf = Buffer.alloc(1);
                    buf.writeUInt16LE(chunk.len as number, 0);
                    bufs.push(buf);
                    bufs.push(chunk.buf);
                } else if (opCodeNum === OpCodeValue.OP_PUSHDATA4) {
                    buf = Buffer.alloc(1);
                    buf.writeUInt32LE(chunk.len as number, 0);
                    bufs.push(buf);
                    bufs.push(chunk.buf);
                }
            }
        }

        return Buffer.concat(bufs);
    }

    get address(): string {
        const publicKey = this.toBuffer();
        const hash = CryptoUtil.sha256Ripemd160(publicKey);
        const prefixedHash = Buffer.alloc(1 + hash.length);
        prefixedHash.writeUInt8(0x05, 0);
        hash.copy(prefixedHash, 1);
        const checksum = CryptoUtil.sha256Sha256(prefixedHash).slice(0, 4);
        const rawAddress = Buffer.concat([prefixedHash, checksum]);
        return CryptoUtil.encodeBs58(rawAddress);
    }
}
