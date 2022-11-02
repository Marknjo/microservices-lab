import express, { json, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import { env } from 'process';

/// Routes
import { signUpRoute } from './routes/signup';
import { signInRoute } from './routes/signin';
import { signOutRoute } from './routes/signout';
import { currentUserRoute } from './routes/current-user';

// @ts-ignore: false positive
const app = express() as Express;

app.set('trust proxy', 1);

//// Setup running env
const apiVersion = env.API_VERSION || 1;
export const baseURL =
  env.RUN_ENV === 'kubernetes' ? `/api/v${+apiVersion}/users` : '';

/// Handle logging
const morganLogOptions =
  env.NODE_ENV === 'production' ? 'combined' : 'dev';

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

/// Export App
export { app };
