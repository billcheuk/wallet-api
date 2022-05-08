import config from '../utils/config';
import { testData } from '../testdata/test.data';
import { BitcoinAddress, NetworkVersion, networkVersions } from './index';

describe('BitcoinAddress', () => {
    const network: NetworkVersion = networkVersions.get(config.bitcionNetwork) as NetworkVersion;

    describe('address_p2wpkh', () => {
        it('should get correct p2wpkh address', async () => {
            const bitcoinAddress: BitcoinAddress = BitcoinAddress.from(
                Buffer.from(testData.childKey.publicKey, 'hex'),
                network,
            );
            expect(bitcoinAddress.address_p2wpkh).toBe(testData.p2wpkhAddress);
        });
    });

    describe('from', () => {
        it('should get instance of BitcoinAddress', async () => {
            const bitcoinAddress: BitcoinAddress = BitcoinAddress.from(
                Buffer.from(testData.childKey.publicKey, 'hex'),
                network,
            );
            expect(bitcoinAddress.address_p2pkh).toBe(testData.p2pkhAddress);
        });

        it('should throw error when pass invalid public key', async () => {
            try {
                BitcoinAddress.from(Buffer.from(testData.masterSeed, 'hex'), network);
            } catch (error: any) {
                expect(error.message).toContain('invalid public key');
            }
        });
    });

    describe('address_p2wpkh', () => {
        it('should get correct p2wpkh address', async () => {
            const bitcoinAddress: BitcoinAddress = BitcoinAddress.from(
                Buffer.from(testData.childKey.publicKey, 'hex'),
                network,
            );
            expect(bitcoinAddress.address_p2wpkh).toBe(testData.p2wpkhAddress);
        });
    });
});
