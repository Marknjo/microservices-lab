import {
  SupportedEnvLoaderTypes,
  envLoader,
  BaseEnvLoaderTypes,
} from './envs-loader.config';

/**
 * Envs Names and Types
 */
export interface EnvsTypes extends BaseEnvLoaderTypes {
  PORT: string;
  RUN_ENV: string;
  HOST: string;
  DB_PASS: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_URL: string;
  NODE_ENV: string;
}

/// Load all app envs
envLoader.add<EnvsTypes>('PORT', SupportedEnvLoaderTypes.NUMBER);
envLoader.add<EnvsTypes>('RUN_ENV', SupportedEnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('HOST', SupportedEnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_PASS', SupportedEnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_HOST', SupportedEnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_NAME', SupportedEnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_USER', SupportedEnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_PORT', SupportedEnvLoaderTypes.NUMBER);
envLoader.add<EnvsTypes>('DB_URL', SupportedEnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('NODE_ENV', SupportedEnvLoaderTypes.STRING);

/// Default get the node env
export const nodeEnv = envLoader.use<EnvsTypes>('DB_NAME');
