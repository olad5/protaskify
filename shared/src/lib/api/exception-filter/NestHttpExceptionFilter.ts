import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CoreApiResponse } from '../CoreApiResponse';
import { Exception } from '@protaskify/shared/exception/Exception';
import { Code } from '@protaskify/shared/code/Code';
import { ServerConfig } from '@protaskify/shared/infrastructure/config/ServerConfig';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse = CoreApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message
    );

    errorResponse = this.handleAppException(error, errorResponse);
    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);
    const errorStackTrace: string =
      errorResponse.code >= 500
        ? `\n\nStrackTrace: ${errorResponse.stackTrace}\n`
        : '';

    if (ServerConfig.LOG_ENABLE) {
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.path}; ` +
        `Error: ${errorResponse.message}` +
        errorStackTrace;

      Logger.error(message);
    }

    response
      .status(errorResponse.code > 500 ? 500 : errorResponse.code)
      .json(this.jsonResponse(errorResponse));
  }

  private jsonResponse(data: CoreApiResponse<unknown>) {
    if (data && data.data) data.data['context'] = undefined;
    const dataWithoutContext = {
      ...Object.assign({}, data),
      context: undefined,
    };
    return {
      ...dataWithoutContext,
      stackTrace: undefined,
    };
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(
        error.getStatus(),
        error.message,
        null
      );
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
        null
      );
    }

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>
  ): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(
        error.code,
        error.message,
        error.data,
        error.stack
      );
    }

    return errorResponse;
  }

  private handleAppException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>
  ): CoreApiResponse<unknown> {
    if (error) {
      errorResponse = CoreApiResponse.error(
        Code.INTERNAL_ERROR.code,
        Code.INTERNAL_ERROR.message,
        undefined,
        error.stack
      );
    }

    return errorResponse;
  }
}
