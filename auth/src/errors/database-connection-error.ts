import { ValidationError } from 'express-validator';

export class DatabaseConnectionError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    /// Cox extending built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);

    /// DO not trace
    Error.captureStackTrace(this, this.constructor);
  }
}
