import {HttpException} from '@nestjs/common';
import {IErrors} from '../interfaces/error.interface';

export class BaseHttpException extends HttpException {
  constructor(response: IErrors, statusCode: number) {
    super(response, statusCode);
  }
}
