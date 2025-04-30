import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/helpers/api-response.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any)?.message || 'Internal server error';

    const result = new ApiResponse({
      code: status,
      success: false,
      message:
        typeof message === 'string'
          ? message
          : (message as any)?.message || 'Error',
      data: null,
    });

    response.status(status).json(result);
  }
}
