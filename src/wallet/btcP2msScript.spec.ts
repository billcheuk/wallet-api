import { testData } from '../testdata/test.data';
import { BitcoinP2msScript } from './index';

describe('BitcoinP2msScript', () => {
    describe('constructor', () => {
        it('should able to new instance', async () => {
            const bitcoinP2msScript: BitcoinP2msScript = new BitcoinP2msScript(testData.m, testData.publicKeys);
            expect(bitcoinP2msScript.address).toBe(testData.p2msAddress);
        });
        it('should throw error if m greater than length of publicKeys', async () => {
            try {
                new BitcoinP2msScript(testData.publicKeys.length + 1, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m should less than the amount of pub keys');
            }
        });

        it('should throw error if pass invalid m', async () => {
            try {
                new BitcoinP2msScript(Number.NaN, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m must be a number');
            }
        });

        it('should throw error if pass invalid publicKeys', async () => {
            try {
                new BitcoinP2msScript(testData.m, testData.InvalidPublicKeys);
            } catch (error: any) {
                expect(error.message).toContain('Invalid key');
            }
        });
    });
    describe('address', () => {
        it('should get correct p2ms address', async () => {
            const bitcoinP2msScript: BitcoinP2msScript = new BitcoinP2msScript(testData.m, testData.publicKeys);
            expect(bitcoinP2msScript.address).toBe(testData.p2msAddress);
        });
    });
});
