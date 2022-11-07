import { env } from 'process';

import './configs/dotenv.config';

/// Initialize types
import { app, baseURL } from './app';
import { connectToDB, dbUrl } from './configs/db-connection.config';

/// Start express server
const port = env.PORT || 3031;
const hostSrv = env.HOST_SRV || 'localhost';
const host = env.HOST || 'localhost';
const healthUrl = `${baseURL}/health`;

/// Envs without defaults
const rejectEnvIf = (envName: string) => {
  if (!Boolean(env[envName])) {
    throw Error(`Environment variable ${envName}not defined: `);
  }
};

const checkEnvsBeforeUsing = () => {
  rejectEnvIf('DB_URL');
  rejectEnvIf('DB_USER');
  rejectEnvIf('DB_PASS');
  rejectEnvIf('DB_HOST');
  rejectEnvIf('DB_PORT');
  rejectEnvIf('DB_NAME');
};

checkEnvsBeforeUsing();

connectToDB(dbUrl());

app.listen(port, () => {
  console.log('\n');

  const protocol = host !== 'localhost' ? 'https' : 'http';

  console.log(
    `🎊🎊🎊 Auth service running on ${protocol}://${hostSrv}:${port}`
  );

  const rootHostUrl = host === 'localhost' ? `${host}:${port}` : host;

  console.log(
    `🎊🎊🎊 Auth api health check running on ${protocol}://${rootHostUrl}${healthUrl}`
  );
});
