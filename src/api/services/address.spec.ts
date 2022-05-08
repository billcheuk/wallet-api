import { testData } from '../../testdata/test.data';
import { getP2wpkh, getP2sh } from './address';

describe('address', () => {
    describe('getP2wpkh', () => {
        it('should return p2wpkh', async () => {
            expect(getP2wpkh(testData.masterSeed, testData.hdPath)).toEqual(testData.p2wpkhAddress);
        });

        it(`should throw error for too short MasterSeed`, async () => {
            try {
                getP2wpkh(testData.invalidmasterSeedTooShort, testData.hdPath);
            } catch (error: any) {
                expect(error.message).toContain('invalid seed: seed should be at least 128 bits');
            }
        });
        it(`should throw error for too long MasterSeed`, async () => {
            try {
                getP2wpkh(testData.invalidmasterSeedTooLong, testData.hdPath);
            } catch (error: any) {
                expect(error.message).toContain('invalid seed: seed should be at most 512 bits');
            }
        });

        it(`should throw error for invalid path ${testData.invalidHDPathNotStartWithM}`, async () => {
            try {
                getP2wpkh(testData.masterSeed, testData.invalidHDPathNotStartWithM);
            } catch (error: any) {
                expect(error.message).toContain('invalid path');
            }
        });
        it(`should throw error for invalid path ${testData.invalidHDPathNotNumber}`, async () => {
            try {
                getP2wpkh(testData.masterSeed, testData.invalidHDPathNotNumber);
            } catch (error: any) {
                expect(error.message).toContain('invalid child key derivation chain');
            }
        });
    });
    describe('getP2sh', () => {
        it('should return getP2sh', async () => {
            expect(getP2sh(testData.m, testData.publicKeys)).toEqual(testData.p2msAddress);
        });

        it('should throw error if m greater than length of publicKeys', async () => {
            try {
                getP2sh(testData.publicKeys.length + 1, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m should less than the amount of pub keys');
            }
        });

        it('should throw error if pass invalid m', async () => {
            try {
                getP2sh(Number.NaN, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m must be a number');
            }
        });

        it('should throw error if pass invalid publicKeys', async () => {
            try {
                getP2sh(testData.m, testData.InvalidPublicKeys);
            } catch (error: any) {
                expect(error.message).toContain('Invalid key');
            }
        });
    });
});
