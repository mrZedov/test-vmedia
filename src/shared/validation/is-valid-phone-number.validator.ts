import {ValidationOptions, registerDecorator} from 'class-validator';
import {PhoneValidateHelper} from '../helpers/phone-validate.helper';

export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: {message: 'Wrong phone', ...validationOptions},
      validator: {
        validate: (value: string) => {
          return PhoneValidateHelper.isValidPhoneNumber(value);
        },
      },
    });
  };
}
