import { testData } from '../testdata/test.data';
import { CryptoUtil } from './cryptoUtil';

describe('CryptoUtil', () => {
    const buffer: Buffer = Buffer.from(testData.childKey.publicKey, 'hex');
    let invalidBuffer: Buffer;

    describe('sha256', () => {
        it('should get correct sha256', async () => {
            const result = CryptoUtil.sha256(buffer);
            expect(result.toString('hex')).toBe(testData.sha256);
        });
        it('should throw error', async () => {
            try {
                CryptoUtil.sha256(invalidBuffer);
            } catch (error: any) {
                expect(error.message).toContain('sha256 hash must be of a buffer');
            }
        });
    });

    describe('ripemd160', () => {
        it('should get correct ripemd160', async () => {
            const result = CryptoUtil.ripemd160(buffer);
            expect(result.toString('hex')).toBe(testData.ripemd160);
        });
        it('should throw error', async () => {
            try {
                CryptoUtil.ripemd160(invalidBuffer);
            } catch (error: any) {
                expect(error.message).toContain('ripemd160 hash must be of a buffer');
            }
        });
    });

    describe('ripemd160', () => {
        it('should get correct ripemd160', async () => {
            const result = CryptoUtil.ripemd160(buffer);
            expect(result.toString('hex')).toBe(testData.ripemd160);
        });
        it('should throw error', async () => {
            try {
                CryptoUtil.ripemd160(invalidBuffer);
            } catch (error: any) {
                expect(error.message).toContain('ripemd160 hash must be of a buffer');
            }
        });
    });

    describe('sha256Sha256', () => {
        it('should get correct sha256Sha256', async () => {
            const result = CryptoUtil.sha256Sha256(buffer);
            expect(result.toString('hex')).toBe(testData.sha256Sha256);
        });
        it('should throw error', async () => {
            try {
                CryptoUtil.sha256Sha256(invalidBuffer);
            } catch (error: any) {
                expect(error.message).toContain('sha256 hash must be of a buffer');
            }
        });
    });

    describe('sha256Ripemd160', () => {
        it('should get correct sha256Ripemd160', async () => {
            const result = CryptoUtil.sha256Ripemd160(buffer);
            expect(result.toString('hex')).toBe(testData.sha256Ripemd160);
        });
        it('should throw error', async () => {
            try {
                CryptoUtil.sha256Ripemd160(invalidBuffer);
            } catch (error: any) {
                expect(error.message).toContain('sha256 hash must be of a buffer');
            }
        });
    });

    describe('hmacSha512', () => {
        it('should get correct hmacSha512', async () => {
            const result = CryptoUtil.hmacSha512(buffer, buffer);
            expect(result.toString('hex')).toBe(testData.hmacSha512);
        });
        it('should throw error for invalid key', async () => {
            try {
                CryptoUtil.hmacSha512(invalidBuffer, buffer);
            } catch (error: any) {
                expect(error.message).toContain('hmacSha512 key must be of a buffer');
            }
        });
        it('should throw error for invalid key', async () => {
            try {
                CryptoUtil.hmacSha512(buffer, invalidBuffer);
            } catch (error: any) {
                expect(error.message).toContain('hmacSha512 hash must be of a buffer');
            }
        });
    });

    describe('encodeBs58', () => {
        it('should get correct Base58', async () => {
            const result = CryptoUtil.encodeBs58(buffer);
            expect(result).toBe(testData.encodeBs58);
        });
        it('should throw error', async () => {
            try {
                CryptoUtil.encodeBs58(invalidBuffer);
            } catch (error: any) {
                expect(error.message).toContain('buf must be of a buffer');
            }
        });
    });

    describe('encodeBech32', () => {
        it('should get correct bech32', async () => {
            const result = CryptoUtil.encodeBech32(buffer, '');
            expect(result).toBe(testData.encodeBech32);
        });
        it('should throw error', async () => {
            try {
                CryptoUtil.encodeBech32(invalidBuffer, '');
            } catch (error: any) {
                expect(error.message).toContain('buf must be of a buffer');
            }
        });
    });
});
