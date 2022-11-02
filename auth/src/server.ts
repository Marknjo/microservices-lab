import { env } from 'process';
import { app, baseURL } from './app';

/// Start express server
const port = env.PORT || 3031;
const hostSrv = env.HOST_SRV || 'localhost';
const host = env.HOST || 'localhost';
const healthUrl = `${baseURL}/health`;

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
