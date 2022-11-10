import { envLoader, BaseEnvLoaderTypes } from './envs-loader.config';

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
  API_VERSION: string;
}

/// Load all app envs
envLoader.add<EnvsTypes>('PORT').number();
envLoader.add<EnvsTypes>('RUN_ENV').string().optional();
envLoader.add<EnvsTypes>('HOST').string();
envLoader.add<EnvsTypes>('DB_PASS').string();
envLoader.add<EnvsTypes>('DB_HOST').string();
envLoader.add<EnvsTypes>('DB_NAME').string();
envLoader.add<EnvsTypes>('DB_USER').string();
envLoader
  .add<EnvsTypes>('DB_PORT')
  .number()
  .default({ value: 27017 });
envLoader.add<EnvsTypes>('DB_URL').string();
envLoader.add<EnvsTypes>('HOST_SRV').string();
envLoader.add<EnvsTypes>('NODE_ENV').optional().string();

envLoader
  .add<EnvsTypes>('API_VERSION')
  .number()
  .optional()
  .default({ value: 1 });

/// Load
envLoader.configure();

/// Default get the node env
export const nodeEnv = envLoader.get<EnvsTypes>('NODE_ENV') as string;
