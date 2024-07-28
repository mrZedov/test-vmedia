import {HttpStatus} from '@nestjs/common';
import {IErrors} from '../interfaces/error.interface';
import {BaseHttpException} from './base-http.exception';

export class ForbiddenException extends BaseHttpException {
  constructor(message?: string, errorCode?: number) {
    const statusCode = HttpStatus.FORBIDDEN;
    const response: IErrors = {
      errors: [
        {
          code: errorCode ?? statusCode,
          message: message || 'Forbidden exception',
        },
      ],
    };
    super(response, statusCode);
  }
}
