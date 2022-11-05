import { env } from 'process';

import './configs/dotenv.config';

import { app, baseURL } from './app';

/// Start express server
const port = env.PORT || 3031;
const hostSrv = env.HOST_SRV || 'localhost';
const host = env.HOST || 'localhost';
const healthUrl = `${baseURL}/health`;

const rejectIf = (test: Boolean, value?: string) => {
  const envName = value ? `${value} ` : '';

  if (!Boolean(test)) {
    throw Error(`Environment variable ${envName}not defined`);
  }
};

const dbUrl = () => {
  rejectIf(Boolean(env.DB_URL), 'DB_URL');
  rejectIf(Boolean(env.DB_USER), 'DB_USER');
  rejectIf(Boolean(env.DB_PASS), 'DB_PASS');
  rejectIf(Boolean(env.DB_HOST), 'DB_HOST');
  rejectIf(Boolean(env.DB_PORT), 'DB_PORT');
  rejectIf(Boolean(env.DB_NAME), 'DB_NAME');

  let url = env.DB_URL!;

  console.log(env.DB_USER!);

  url = url.replace(/{{DB_USER}}/, env.DB_USER!);
  url = url.replace(/{{DB_PASS}}/, env.DB_PASS!);
  url = url.replace(/{{DB_HOST}}/, env.DB_HOST!);
  url = url.replace(/{{DB_PORT}}/, env.DB_PORT!);
  url = url.replace(/{{DB_NAME}}/, env.DB_NAME!);

  return url;
};
const url = dbUrl();

console.table({ url });

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
  console.log('\n');
});
