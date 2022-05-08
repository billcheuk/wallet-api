import { HDKey } from '../../wallet/hdkey';
import { BitcoinP2msScript } from '../../wallet/btcP2msScript';
import { BitcoinAddress } from '../../wallet';
import config from '../../utils/config';
import { NetworkVersion, networkVersions } from '../../wallet';

export function getP2wpkh(seed: string, path: string): string {
    const bitcionNetwork: NetworkVersion = networkVersions.get(config.bitcionNetwork) as NetworkVersion;
    const masterHdKey = HDKey.parseMasterSeed(seed);
    const childHdKey = masterHdKey.derive(path);
    const btcAddres = BitcoinAddress.from(childHdKey.publicKey, bitcionNetwork);
    return btcAddres.address_p2wpkh;
}

export function getP2sh(m: number, pubKeys: string[]): string {
    const p2ms_script = new BitcoinP2msScript(m, pubKeys);
    return p2ms_script.address;
}
