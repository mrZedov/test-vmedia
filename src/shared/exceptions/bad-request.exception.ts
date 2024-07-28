import {HttpStatus} from '@nestjs/common';
import {IError, IErrors} from '../interfaces/error.interface';
import {BaseHttpException} from './base-http.exception';

export class BadRequestException extends BaseHttpException {
  constructor(message?: IError[] | IError | string, statusCode?: HttpStatus) {
    let response: IErrors;
    if (typeof message === 'string') {
      response = {errors: [{message: message}]};
    } else if (Array.isArray(message)) response = {errors: message};
    else response = {errors: [message]};

    super(response, statusCode ?? HttpStatus.BAD_REQUEST);
  }
}
