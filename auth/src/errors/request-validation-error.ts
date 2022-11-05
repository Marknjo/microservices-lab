import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  public readonly statusCode = 400;

  constructor(
    public errors: ValidationError[],
    message: string = 'Invalid request parameters'
  ) {
    super(message);

    // Set prototype
    Object.setPrototypeOf(this, RequestValidationError.prototype);

    /// do not trace to this object
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });
  }
}
