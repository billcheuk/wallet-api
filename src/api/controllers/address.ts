import * as express from 'express';
import { validateMAndKeys, validateSeedAndPath } from '../../utils/validator';
import { writeJsonResponse } from '../../utils/express';
import { getP2sh, getP2wpkh } from '../services';
import logger from '../../utils/logger';

export function p2wpkh(req: express.Request, res: express.Response): void {
    const { seed, path } = req.body;
    try {
        validateSeedAndPath(seed, path);
        const addrP2wpkh = getP2wpkh(seed, path);
        writeJsonResponse(res, 200, { p2wpkh: `${addrP2wpkh}` });
    } catch (err: any) {
        logger.error(err.message, 'get p2wpkh error');
        writeJsonResponse(res, 500, { error: err.message });
    }
}

export function p2sh(req: express.Request, res: express.Response): void {
    const { m, pubKeys } = req.body;
    try {
        validateMAndKeys(m, pubKeys);
        const addrP2sh = getP2sh(m, pubKeys);
        writeJsonResponse(res, 200, { p2sh: `${addrP2sh}` });
    } catch (err: any) {
        logger.error(err.message, 'get p2sh error');
        writeJsonResponse(res, 500, { error: err.message });
    }
}
