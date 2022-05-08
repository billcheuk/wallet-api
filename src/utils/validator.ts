import * as _ from 'lodash';

export function validateSeedAndPath(seed: string, path: string): void {
    validateSeed(seed);
    validatePath(path);
}

export function validateMAndKeys(m: number, keys: string[]): void {
    validateM(m, keys);
    validatePubKeys(keys);
}
export function validatePath(path: string): void {
    const res = /^m\/(44)'?\/\d+'?\/0'?\/\d+'?\/\d+'?$/.exec(path);
    if (_.isNil(res)) {
        throw new Error('Invalid Paths Pattern');
    }
}

export function validateSeed(seed: string): void {
    if (!(seed.length === 128 || seed.length === 256)) {
        throw new Error('Invalid seed');
    }
}

export function validatePubKeys(keys: string[]): void {
    for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        if (element.length !== 130) {
            throw new Error(`Invalid key: ${keys[index]}`);
        }
    }
}
export function validateM(m: number, keys: string[]): void {
    if (typeof m !== 'number') {
        throw new Error('m must be a number');
    }
    if (m > keys.length) {
        throw new Error('m should less than the amount of pub keys');
    }
}
