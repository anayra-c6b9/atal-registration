import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value === null || control.value === undefined) {
      return null; // Return null if the control value is null or undefined
    }

    // Remove whitespace characters and check the length
    const valueWithoutWhitespace = control.value.replace(/\s/g, '');
    const isValid = valueWithoutWhitespace.length >= minLength || valueWithoutWhitespace.length === 0;

    // Return error object if validation fails
    return isValid ? null : { 'minlength': { requiredLength: minLength, actualLength: valueWithoutWhitespace.length } };
  };
}

export function maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === null || control.value === undefined) {
        return null; // Return null if the control value is null or undefined
      }
  
      // Remove whitespace characters and check the length
      const valueWithoutWhitespace = control.value.replace(/\s/g, '');
      const isValid = valueWithoutWhitespace.length <= maxLength;
  
      // Return error object if validation fails
      return isValid ? null : { 'maxlength': { requiredLength: minLength, actualLength: valueWithoutWhitespace.length } };
    };
  }