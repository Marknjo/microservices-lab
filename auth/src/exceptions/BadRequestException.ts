import { ExceptionHandler } from './ExceptionHandler';

export class BadRequestException extends ExceptionHandler {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestException.prototype);
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
