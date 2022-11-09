import { HttpExceptionFilter } from './ExceptionHandler';

export class NotFoundException extends HttpExceptionFilter {
  statusCode: number = 404;

  constructor(public message: string = 'Not found') {
    super(message);

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }

  serializeErrors(): {
    message: string;
    field?: string | undefined;
  }[] {
    return [{ message: this.message }];
  }
}
