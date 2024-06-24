import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(
    exception: {
      status: number;
      message: string;
    },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log(`exception: ${JSON.stringify(exception)}`);

    const status = exception?.status
      ? exception.status
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception?.message ? exception.message : exception;

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify(message)} `,
    );

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
