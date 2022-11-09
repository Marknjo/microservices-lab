import { HttpExceptionFilter } from './ExceptionHandler';

export class BadRequestException extends HttpExceptionFilter {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestException.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors(): {
    message: string;
    field?: string | undefined;
  }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
