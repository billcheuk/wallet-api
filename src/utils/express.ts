import * as express from 'express';
import { OutgoingHttpHeaders } from 'http';
import logger from '../utils/logger';

export function writeJsonResponse(
    res: express.Response,
    code: any,
    payload: any,
    headers?: OutgoingHttpHeaders | undefined,
): void {
    const data = typeof payload === 'object' ? JSON.stringify(payload, null, 2) : payload;
    res.writeHead(code, { ...headers, 'Content-Type': 'application/json' });
    res.end(data);
}

export function logExpress(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const startHrTime = process.hrtime();

    logger.http(
        `Request: ${req.method} ${req.url} at ${new Date().toUTCString()}, User-Agent: ${req.get('User-Agent')}`,
    );
    logger.http(`Request Body: ${JSON.stringify(req.body)}`);

    const [oldWrite, oldEnd] = [res.write, res.end];
    const chunks: Buffer[] = [];
    (res.write as unknown) = function (chunk: any): void {
        chunks.push(Buffer.from(chunk));
        (oldWrite as any).apply(res, arguments);
    };

    res.end = function (chunk: any): express.Response {
        if (chunk) {
            chunks.push(Buffer.from(chunk));
        }

        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        logger.http(`Response ${res.statusCode} ${elapsedTimeInMs.toFixed(3)} ms`);

        const body = Buffer.concat(chunks).toString('utf8');
        logger.http(`Response Body: ${body}`);
        (oldEnd as any).apply(res, arguments);
        return res;
    };

    next();
}
