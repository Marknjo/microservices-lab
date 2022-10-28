import { env } from 'process';
import { app } from './app';

/// Start express server
const port = env.PORT || 3031;
const host = env.HOST || 'localhost';
app.listen(port, () => {
  console.log('\n');

  console.log(
    `🎊🎊🎊 Auth service running on http://${host}:${port}`
  );
  console.log(
    `🎊🎊🎊 Auth service health check running on http://${host}:${port}/health`
  );
  console.log('\n');
});
