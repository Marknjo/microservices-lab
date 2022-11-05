import { env } from 'process';
import mongoose from 'mongoose';

export const dbUrl = (): string => {
  let url = env.DB_URL!;

  url = url.replace(/{{DB_USER}}/, env.DB_USER!);
  url = url.replace(/{{DB_PASS}}/, env.DB_PASS!);
  url = url.replace(/{{DB_HOST}}/, env.DB_HOST!);
  url = url.replace(/{{DB_PORT}}/, env.DB_PORT!);
  url = url.replace(/{{DB_NAME}}/, env.DB_NAME!);

  return url;
};

export const connectToDB = async (url: string) => {
  console.log({ url });

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
