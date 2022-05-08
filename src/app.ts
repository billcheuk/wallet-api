import { createServer } from './server';
import logger from './utils/logger';
import config from './utils/config';

createServer()
    .then((server) => {
        server.listen(config.port, () => {
            logger.info(`Api-doc http://localhost:${config.port}/api-doc`);
        });
    })
    .catch((err) => {
        logger.error(`Error: ${err}`);
    });
