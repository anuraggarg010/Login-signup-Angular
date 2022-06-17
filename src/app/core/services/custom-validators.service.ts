import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
var md5 = require('md5')

@Injectable({
  providedIn: 'root'
})

export class CustomValidatorsService {

  constructor(

  ) {}

  mustMatch(controlName:string, matching:string) {

    return (formGroup: FormGroup) => {
      const   control = formGroup.controls[controlName],
              matchingControl = formGroup.controls[matching]
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }
}
