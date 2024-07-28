import {isValidPhoneNumber} from 'libphonenumber-js';

export class PhoneValidateHelper {
  public static isValidPhoneNumber(phone: string): boolean {
    return isValidPhoneNumber(`+${phone}`) ? true : false;
  }
}
