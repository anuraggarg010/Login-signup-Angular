import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router"
import {CookieStorageService} from '../../../core/services/cookie-storage.service'
import {UtilService} from "../../../core/services/util.service"
import {CustomValidatorsService} from "../../../core/services/custom-validators.service"
import { ToastrService } from 'ngx-toastr'
var md5 = require('md5')

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {

  signUp:        any     = FormGroup
  user:          any     = {}
  userSubmitted: boolean = false
  show:          boolean = false

 

  constructor(private fb: FormBuilder, private router: Router,
              private toastr:      ToastrService,
              private utilService: UtilService,
              private CustomValidators: CustomValidatorsService
              ) {}

  ngOnInit(): void {
    this.signUp = this.fb.group({
      fname:    ["", Validators.required],
      lname:    ["", Validators.required],
      mobileNo: ["", Validators.required],
      emailAddress: ["",[Validators.required,Validators.email]],
      userId:          ["", Validators.required],
      password:        ["", Validators.required],
      confirmPassword: ["", Validators.required],
      gender         : [""],
      status         : [""],
      age            : [""],
      address        : [""],
      postalCode     : [""],
      image          : ['https://img.icons8.com/bubbles/100/000000/user.png']
    }, {
      validators : [this.CustomValidators.mustMatch('password', 'confirmPassword'),
                    this.utilService.emailvalidation('emailAddress')
                    ]
    })}


  goToLogIn() {                        // sidebar login button 
    this.router.navigate(['login']);
  }
  password() {
    this.show = !this.show
}
  get f(){
    console.log(this.signUp.controls)
    return this.signUp.controls
  }

  registerForm(data: any) {            //called when user click on signup button
  this.signUp.patchValue({
    password:        md5(this.signUp.get('password').value),
    confirmPassword: md5(this.signUp.get('confirmPassword').value),
    gender:     'none',
    status:     'none',
    age:        'none',
    address:    'none',
    postalCode: 'none'
  })

  let body =  btoa(JSON.stringify(this.signUp.value)) // getting full signup form
  let email = btoa(data.emailAddress)
  localStorage.setItem(email,JSON.stringify((body))) // setting values of form 
  this.toastr.success('Succesfully Created Account!')
  this.signUp.reset()

}


}
