import dotenvExtended from 'dotenv-extended';
import dotenvParseVariables from 'dotenv-parse-variables';
import { Network } from 'src/wallet/networkVersions';

const env = dotenvExtended.load({
    path: process.env.ENV_FILE,
    defaults: './config/.env.defaults',
    schema: './config/.env.schema',
    includeProcessEnv: true,
    silent: false,
    errorOnMissing: true,
    errorOnExtra: true,
});

const parsedEnv = dotenvParseVariables(env);

type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

interface Config {
    expressLogger: boolean;
    loggerLevel: LogLevel;
    bitcionNetwork: Network;
    port: number;
}

const config: Config = {
    expressLogger: parsedEnv.LOGGER_EXPRESS as boolean,
    loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel,
    bitcionNetwork: parsedEnv.BITCOIN_NETWORK as Network,
    port: parsedEnv.PORT as number,
};

export default config;
