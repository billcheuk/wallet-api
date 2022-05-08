import bodyParser from 'body-parser';
import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import { connector, summarise } from 'swagger-routes-express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as api from './api/controllers';
import config from './utils/config';
import { logExpress } from './utils/express';
import logger from './utils/logger';

export async function createServer(): Promise<Express> {
    const yamlSpecFile = './config/openapi.yml';
    const apiDefinition = YAML.load(yamlSpecFile);
    const apiSummary = summarise(apiDefinition);
    logger.info(apiSummary);

    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    if (config.expressLogger) {
        server.use(logExpress);
    }

    const validatorOptions = {
        apiSpec: yamlSpecFile,
        validateRequests: true,
        validateResponses: true,
    };
    server.use(OpenApiValidator.middleware(validatorOptions));

    server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status).json({
            error: {
                type: 'request_validation',
                message: err.message,
                errors: err.errors,
            },
        });
    });

    server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(apiDefinition));

    const connect = connector(api, apiDefinition, {
        onCreateRoute: (method: string, descriptor: any[]) => {
            logger.verbose(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`);
        },
    });

    connect(server);

    return server;
}
