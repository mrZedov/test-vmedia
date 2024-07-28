import {IError} from './error.interface';

export interface IEexceptionResponse {
  error?: string;
  message?: string;
  errors?: IError[];
}
