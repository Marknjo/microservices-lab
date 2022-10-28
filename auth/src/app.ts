import express, { json, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import { env } from 'process';

// @ts-ignore: false positive
const app = express() as Express;

/// Handle logging
const morganLogOptions =
  env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(morgan(morganLogOptions));

/// Other configs
app.use(json({ limit: '10kb' }));
app.use(cors());
app.use(compression());

app.get('/health', (req: Request, res: Response) => {
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

/// Export App
export { app };
