import express, { json, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

/// Local packages
import globalExceptionHandler from './middlewares/global-exception-handler';

/// Routes
import { signUpRoute } from './routes/signup';
import { signInRoute } from './routes/signin';
import { signOutRoute } from './routes/signout';
import { currentUserRoute } from './routes/current-user';
import { NotFoundException } from './exceptions/NotFoundException';
import { envLoader } from './configs/envs-loader.config';
import { EnvsTypes, nodeEnv } from './configs/app-envs.config';

// @ts-ignore: false positive
const app = express() as Express;

app.set('trust proxy', 1);

let apiVersion = envLoader.use<EnvsTypes>('API_VERSION');
const runEnv = envLoader.use<EnvsTypes>('RUN_ENV');

//// Setup running env
apiVersion = apiVersion || 1;
export const baseURL =
  runEnv === 'kubernetes' ? `/api/v${+apiVersion}/users` : '';

/// Handle logging
const morganLogOptions =
  nodeEnv === 'production' ? 'combined' : 'dev';

app.use(morgan(morganLogOptions));

/// Other configs
app.use(json({ limit: '10kb' }));
app.use(cors());
app.use(compression());

console.table({ apiVersion, baseURl: baseURL });

app.get(`${baseURL}/health`, (req: Request, res: Response) => {
  res.send(
    `
    <div style="
           margin: 30px auto; 
           display: flex; 
           flex-direction: 
           column; 
           align-items: center"
      >
      <h1 style="
          line-height: 1; 
          margin: 5px 0;
          
          text-transform: capitalize;
          ">Welcome to Auth API 😃</h1>
      <p style="margin-bottom: 10px; font-size: 18px">API working as expected</p>
      <p style="margin: 0; line-height: 0; color:#909090"><small>Microservices group for ticketing service</small></p>
    </div>
    `
  );
});

//// Routes
app.use(`${baseURL}`, signUpRoute);
app.use(`${baseURL}`, signInRoute);
app.use(`${baseURL}`, signOutRoute);
app.use(`${baseURL}`, currentUserRoute);

console.log('...');

/// Handle errors
app.all('*', () => {
  throw new NotFoundException();
});
app.use(globalExceptionHandler);

/// Export App
export { app };
