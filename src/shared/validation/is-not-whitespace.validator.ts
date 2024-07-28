import {ValidationOptions, registerDecorator} from 'class-validator';

export function IsNotWhitespace(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isNotWhitespace',
      target: object.constructor,
      propertyName: propertyName,
      options: {message: 'The parameter must not consist only of spaces', ...validationOptions},
      validator: {
        validate: (value: string) => {
          return value && value.trim() !== '';
        },
      },
    });
  };
}
