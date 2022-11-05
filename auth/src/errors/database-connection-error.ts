import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  public readonly statusCode = 500;

  constructor(
    public message: string = 'Error connecting to database'
  ) {
    super(message);

    // Set prototype
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);

    /// do not trace to this object
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
