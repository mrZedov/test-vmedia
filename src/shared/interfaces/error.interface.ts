export interface IError {
  field?: string;
  code?: number;
  message: string;
  value?: string | number | string[] | number[];
  details?: number[] | string[] | string | number;
}

export interface IErrors {
  errors: IError[];
}
