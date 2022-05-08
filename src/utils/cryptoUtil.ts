import { sha256, ripemd160 } from 'hash.js';
import * as crypto from 'crypto';
import bs58 from 'bs58';
import { bech32 } from 'bech32';

export class CryptoUtil {
    public static sha256(buf: Buffer): Buffer {
        if (!Buffer.isBuffer(buf)) {
            throw new Error('sha256 hash must be of a buffer');
        }
        const hash = sha256().update(buf).digest();
        return Buffer.from(hash);
    }

    public static ripemd160(buf: Buffer): Buffer {
        if (!Buffer.isBuffer(buf)) {
            throw new Error('ripemd160 hash must be of a buffer');
        }
        const hash = ripemd160().update(buf).digest();
        return Buffer.from(hash);
    }

    public static sha256Sha256(buf: Buffer): Buffer {
        return CryptoUtil.sha256(CryptoUtil.sha256(buf));
    }

    public static sha256Ripemd160(buf: Buffer): Buffer {
        return CryptoUtil.ripemd160(CryptoUtil.sha256(buf));
    }

    public static hmacSha512(key: Buffer, buf: Buffer): Buffer {
        if (!Buffer.isBuffer(key)) {
            throw new Error('hmacSha512 key must be of a buffer');
        }

        if (!Buffer.isBuffer(buf)) {
            throw new Error('hmacSha512 hash must be of a buffer');
        }
        return crypto.createHmac('sha512', key).update(buf).digest();
    }

    public static encodeBs58(buf: Buffer): string {
        if (!Buffer.isBuffer(buf)) {
            throw new Error('buf must be of a buffer');
        }
        return bs58.encode(buf);
    }

    public static encodeBech32(buf: Buffer, prefix: string): string {
        if (!Buffer.isBuffer(buf)) {
            throw new Error('buf must be of a buffer');
        }
        const words = bech32.toWords(buf);
        words.unshift(0x00);
        return bech32.encode(prefix, words);
    }
}
