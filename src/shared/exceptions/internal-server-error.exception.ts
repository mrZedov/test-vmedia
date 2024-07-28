import {HttpStatus} from '@nestjs/common';
import {IErrors} from '../interfaces/error.interface';
import {BaseHttpException} from './base-http.exception';

export class InternalServerErrorException extends BaseHttpException {
  constructor(message: string, errorCode: number) {
    const response: IErrors = {
      errors: [
        {
          code: errorCode,
          message: message,
        },
      ],
    };
    super(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
