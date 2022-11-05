export abstract class ExceptionHandler extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);

    // Set prototype
    Object.setPrototypeOf(this, ExceptionHandler.prototype);

    /// do not trace to this object
    Error.captureStackTrace(this, this.constructor);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
