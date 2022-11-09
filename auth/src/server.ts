import './configs/dotenv.config';

/// Initialize types
import { app, baseURL } from './app';
import { connectToDB, dbUrl } from './configs/db-connection.config';
import { envLoader } from './configs/envs-loader.config';
import { EnvsTypes } from './configs/app-envs.config';

/// Load defaults

/// Start express server
const port = envLoader.use<EnvsTypes>('PORT') as number;
const hostSrv = envLoader.use<EnvsTypes>('HOST_SRV') as string;
const host = envLoader.use<EnvsTypes>('HOST') as string;
const healthUrl = `${baseURL}/health`;

/// Connect to the database
connectToDB(dbUrl());

/// Start App
app.listen(port, () => {
  console.log('\n');

  const protocol = host !== 'localhost' ? 'https' : 'http';

  console.log(
    `🎊🎊🎊 Auth service running on ${protocol}://${hostSrv}:${port}`
  );

  const rootHostUrl = host === 'localhost' ? `${host}:${port}` : host;

  console.log(
    `🎊🎊🎊 Auth api health check running on ${protocol}://${rootHostUrl}${healthUrl} \n`
  );
});
