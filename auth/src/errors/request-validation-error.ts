import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // Set prototype
    Object.setPrototypeOf(this, RequestValidationError.prototype);

    /// do not trace to this object
    Error.captureStackTrace(this, this.constructor);
  }
}
