import { NextFunction, Request, Response } from 'express';
import { ExceptionHandler } from '../exceptions/ExceptionHandler';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ExceptionHandler) {
    return res
      .status(err.statusCode)
      .json({ errors: err.serializeErrors() });
  }

  res.status(500).json({
    errors: [
      {
        message: 'Internal server error, Please try again',
      },
    ],
  });

  // next();
};
