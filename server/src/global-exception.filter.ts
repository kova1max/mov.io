import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly DEFAULT_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
  private readonly DEFAULT_RESPONSE = 'Internal server error';

  catch(e: Error, host: ArgumentsHost) {
    const isHttpExceptionInstance = e instanceof HttpException;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    console.error(e);

    const statusCode = isHttpExceptionInstance
      ? e.getStatus()
      : this.DEFAULT_STATUS;
    const message = isHttpExceptionInstance
      ? e.getResponse()
      : this.DEFAULT_RESPONSE;

    res.status(statusCode).json({ statusCode, message, path: req.url });
  }
}
