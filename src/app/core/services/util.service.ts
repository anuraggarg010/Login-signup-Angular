import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
var md5 = require('md5')
@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(

  ) {}

   password(controlName: string, matching: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      if (control.errors && !control.errors.confirmedValidator) {
        return;
      }
      console.log(matching ,control.value )
      if (md5(control.value) !== matching) {
        control.setErrors({ confirmedValidator: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  emailvalidation(controlName:string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName],
            keys    = Object.keys(localStorage)
      for (let key in keys) {
        let arr = keys[key]
       
          if (arr === btoa(control.value)) {
            console.log('in key')
            control.setErrors({ confirmedValidator: true });
            return;
          
        }
      }
      control.setErrors(null);
    } 
  }
}
