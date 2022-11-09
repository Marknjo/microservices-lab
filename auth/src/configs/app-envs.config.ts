import {
  EnvLoaderTypes,
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
  HOST_SRV: string;
}

/// Load all app envs
envLoader.add<EnvsTypes>('PORT', EnvLoaderTypes.NUMBER);
envLoader.add<EnvsTypes>('RUN_ENV', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('HOST', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_PASS', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_HOST', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_NAME', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_USER', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('DB_PORT', EnvLoaderTypes.NUMBER);
envLoader.add<EnvsTypes>('DB_URL', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('NODE_ENV', EnvLoaderTypes.STRING);
envLoader.add<EnvsTypes>('HOST_SRV', EnvLoaderTypes.STRING);

/// Default get the node env
export const nodeEnv = envLoader.get<EnvsTypes>('DB_NAME') as string;
