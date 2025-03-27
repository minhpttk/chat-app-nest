import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Lấy chi tiết lỗi
    const exceptionResponse = exception.getResponse() as any;
    console.log('Exception response full:', exceptionResponse);
    
    // Kiểm tra cấu trúc của lỗi để trích xuất message
    let errors = exceptionResponse;
    if (typeof exceptionResponse === 'object') {
      errors = exceptionResponse.message || exceptionResponse;
    }
    
    return response.status(400).json({
      statusCode: 400,
      message: Array.isArray(errors) ? errors[0] : errors,
      errors: Array.isArray(errors) ? errors : [errors]
    });
  }
}