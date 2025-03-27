import {
    BadRequestException,
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { I18nContext } from 'nestjs-i18n';
 
  @Catch(BadRequestException)
  export class DtoValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
      const status = HttpStatus.BAD_REQUEST;
  
      const i18n = I18nContext.current();
      const validationErrors = exception.getResponse() as any;
  
      // Xử lý message array
      const messages = validationErrors.message || [];
      const formattedErrors = messages.map((error: string) => {
        return {
          message: i18n?.translate(error, {
            lang: request.query.lang as string
          }) || error
        };
      });
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: formattedErrors
      });
    }
  }
  