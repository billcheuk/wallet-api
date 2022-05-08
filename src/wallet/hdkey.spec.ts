import { testData } from '../testdata/test.data';
import { HDKey } from './hdkey';

describe('HDKey', () => {
    describe('derive', () => {
        it('should get correct child key for valid path', async () => {
            const masterHdKey = HDKey.parseMasterSeed(testData.masterSeed);
            const childHdKey = masterHdKey.derive(testData.hdPath);
            expect(childHdKey.privateKey?.toString('hex')).toBe(testData.childKey.privateKey);
            expect(childHdKey.publicKey.toString('hex')).toBe(testData.childKey.publicKey);
        });
        it(`should throw error for invalid path ${testData.invalidHDPathNotStartWithM}`, async () => {
            try {
                const masterHdKey = HDKey.parseMasterSeed(testData.masterSeed);
                masterHdKey.derive(testData.invalidHDPathNotStartWithM);
            } catch (error: any) {
                expect(error.message).toContain('invalid path');
            }
        });
        it(`should throw error for invalid path ${testData.invalidHDPathNotNumber}`, async () => {
            try {
                const masterHdKey = HDKey.parseMasterSeed(testData.masterSeed);
                masterHdKey.derive(testData.invalidHDPathNotNumber);
            } catch (error: any) {
                expect(error.message).toContain('invalid child key derivation chain');
            }
        });
    });

    describe('parseMasterSeed', () => {
        it('should get instance', async () => {
            const masterHdKey = HDKey.parseMasterSeed(testData.masterSeed);
            const childHdKey = masterHdKey.derive(testData.hdPath);
            expect(childHdKey.privateKey?.toString('hex')).toBe(testData.childKey.privateKey);
            expect(childHdKey.publicKey.toString('hex')).toBe(testData.childKey.publicKey);
        });
        it(`should throw error for too short MasterSeed`, async () => {
            try {
                HDKey.parseMasterSeed(testData.invalidmasterSeedTooShort);
            } catch (error: any) {
                expect(error.message).toContain('invalid seed: seed should be at least 128 bits');
            }
        });
        it(`should throw error for too long MasterSeed`, async () => {
            try {
                HDKey.parseMasterSeed(testData.invalidmasterSeedTooLong);
            } catch (error: any) {
                expect(error.message).toContain('invalid seed: seed should be at most 512 bits');
            }
        });
    });
});
