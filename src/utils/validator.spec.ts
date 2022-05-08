import { testData } from '../testdata/test.data';
import * as validator from './validator';

describe('validator', () => {
    describe('validateSeedAndPath', () => {
        it('should no error', async () => {
            validator.validateSeedAndPath(testData.masterSeed, testData.hdPath);
        });
        it('should throw error if pass invalid seed', async () => {
            try {
                validator.validateSeedAndPath(testData.invalidmasterSeedTooShort, testData.hdPath);
            } catch (error: any) {
                expect(error.message).toContain('Invalid seed');
            }
        });
        it('should throw error if pass invalid path', async () => {
            try {
                validator.validateSeedAndPath(testData.masterSeed, testData.invalidHDPathNotStartWithM);
            } catch (error: any) {
                expect(error.message).toContain('Invalid Paths Pattern');
            }
        });
    });

    describe('validatePath', () => {
        it('should no error', async () => {
            validator.validatePath(testData.hdPath);
        });
        it('should throw error if pass invalid path', async () => {
            try {
                validator.validatePath(testData.invalidHDPathNotStartWithM);
            } catch (error: any) {
                expect(error.message).toContain('Invalid Paths Pattern');
            }
        });
    });

    describe('validateSeed', () => {
        it('should no error', async () => {
            validator.validateSeed(testData.masterSeed);
        });
        it('should throw error if pass invalid seed', async () => {
            try {
                validator.validateSeed(testData.invalidmasterSeedTooShort);
            } catch (error: any) {
                expect(error.message).toContain('Invalid seed');
            }
        });
    });

    describe('validateMAndKeys', () => {
        it('should no error', async () => {
            validator.validateMAndKeys(testData.m, testData.publicKeys);
        });
        it('should throw error if pass invalid publicKeys', async () => {
            try {
                validator.validateMAndKeys(testData.m, testData.InvalidPublicKeys);
            } catch (error: any) {
                expect(error.message).toContain('Invalid key');
            }
        });
        it('should throw error if pass invalid m', async () => {
            try {
                validator.validateMAndKeys(Number.NaN, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m must be a number');
            }
        });
        it('should throw error if m  length of publicKeys', async () => {
            try {
                validator.validateMAndKeys(testData.publicKeys.length + 1, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m should less than the amount of pub keys');
            }
        });
    });

    describe('validatePubKeys', () => {
        it('should no error', async () => {
            validator.validatePubKeys(testData.publicKeys);
        });
        it('should throw error if pass invalid publicKeys', async () => {
            try {
                validator.validatePubKeys(testData.InvalidPublicKeys);
            } catch (error: any) {
                expect(error.message).toContain('Invalid key');
            }
        });
    });

    describe('validateM', () => {
        it('should no error', async () => {
            validator.validateM(testData.m, testData.publicKeys);
        });
        it('should throw error if pass invalid m', async () => {
            try {
                validator.validateM(Number.NaN, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m must be a number');
            }
        });
        it('should throw error if m  length of publicKeys', async () => {
            try {
                validator.validateM(testData.publicKeys.length + 1, testData.publicKeys);
            } catch (error: any) {
                expect(error.message).toContain('m should less than the amount of pub keys');
            }
        });
    });
});
