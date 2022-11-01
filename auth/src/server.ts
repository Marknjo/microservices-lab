import { env } from 'process';
import { app, baseURl } from './app';

/// Start express server
const port = env.PORT || 3031;
const hostSrv = env.HOST_SRV || 'localhost';
const host = env.HOST || 'localhost';
const health = env.HEALTH || `${baseURl}health`;

app.listen(port, () => {
  console.log('\n');

  const protocol = host !== 'localhost' ? 'https' : 'http';

  console.log(
    `🎊🎊🎊 Auth service running on ${protocol}://${hostSrv}:${port}`
  );
  console.log(
    `🎊🎊🎊 Auth service health check running on ${protocol}://${host}:${port}/${health}`
  );
  console.log('\n');
});
