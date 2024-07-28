import {HttpStatus} from '@nestjs/common';
import {IErrors} from '../interfaces/error.interface';
import {BaseHttpException} from './base-http.exception';

export class NotFoundException extends BaseHttpException {
  constructor(message?: string, errorCode?: number) {
    const statusCode = HttpStatus.NOT_FOUND;
    const response: IErrors = {
      errors: [
        {
          code: errorCode ?? 404,
          message: message || 'Not found',
        },
      ],
    };
    super(response, statusCode);
  }
}
