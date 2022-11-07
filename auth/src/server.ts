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

/// Connect to the database
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
