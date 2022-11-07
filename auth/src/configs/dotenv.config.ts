import { env } from 'process';
import dotenv from 'dotenv';

const stage = env.NODE_ENV === 'production' ? false : 'dev';

const options = stage
  ? {
      path: `../envs/${stage}.env`,
    }
  : {};

dotenv.config(options);

/// Load app envs - Must load after initialization of the dotenv
import './app-envs.config';
