import { AuthService } from '../service/auth.service';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class Utils {
  /**
   * method to clone data
   * @param data
   * @returns
   */
  public static getClonedData(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  public static parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  static whitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.trim() === '') {
        return { whitespace: true };
      }
      return null;
    };
  }
}
