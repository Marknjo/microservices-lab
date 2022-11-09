import { HttpExceptionFilter } from './ExceptionHandler';

export class DatabaseConnectionException extends HttpExceptionFilter {
  public readonly statusCode = 500;

  constructor(
    public message: string = 'Error connecting to database'
  ) {
    super(message);

    // Set prototype
    Object.setPrototypeOf(
      this,
      DatabaseConnectionException.prototype
    );

    /// do not trace to this object
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
