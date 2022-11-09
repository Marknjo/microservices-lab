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
envLoader.number().add<EnvsTypes>('PORT');
envLoader.string().optional().add<EnvsTypes>('RUN_ENV');
envLoader.string().add<EnvsTypes>('HOST');
envLoader.string().add<EnvsTypes>('DB_PASS');
envLoader.string().add<EnvsTypes>('DB_HOST');
envLoader.string().add<EnvsTypes>('DB_NAME');
envLoader.string().add<EnvsTypes>('DB_USER');
envLoader.number().add<EnvsTypes>('DB_PORT');
envLoader.string().add<EnvsTypes>('DB_URL');
envLoader.optional().string().add<EnvsTypes>('NODE_ENV');
envLoader.string().add<EnvsTypes>('HOST_SRV');
// envLoader.add('API_VERSION');

/// Default get the node env
export const nodeEnv = envLoader.get<EnvsTypes>('NODE_ENV') as string;
