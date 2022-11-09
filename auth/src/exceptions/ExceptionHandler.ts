export abstract class HttpExceptionFilter extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);

    // Set prototype
    Object.setPrototypeOf(this, HttpExceptionFilter.prototype);

    /// do not trace to this object
    Error.captureStackTrace(this, this.constructor);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
