import { env } from 'process';
import mongoose from 'mongoose';
import { envLoader } from './envs-loader.config';
import { EnvsTypes } from './app-envs.config';

export const dbUrl = (): string => {
  let url = env.DB_URL!;
  const dbUser = envLoader.use<EnvsTypes>('DB_USER');
  const dbPass = envLoader.use<EnvsTypes>('DB_PASS');
  const dbPort = envLoader.use<EnvsTypes>('DB_PORT');
  const dbHost = envLoader.use<EnvsTypes>('DB_HOST');
  const dbName = envLoader.use<EnvsTypes>('DB_NAME');

  url = url.replace(/{{DB_USER}}/, dbUser);
  url = url.replace(/{{DB_PASS}}/, dbPass);
  url = url.replace(/{{DB_HOST}}/, dbHost);
  url = url.replace(/{{DB_PORT}}/, dbPort);
  url = url.replace(/{{DB_NAME}}/, dbName);

  return url;
};

export const connectToDB = async (url: string) => {
  try {
    await mongoose.connect(url, {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });

    console.log(`🎊🎊🎊 Mongo DB Connection successful \n`);
  } catch (err) {
    const error = err as unknown as Error;

    console.log(`Mongo DB connection failed with error 💥💥💥`);
    console.error(error.stack);
  }
};
