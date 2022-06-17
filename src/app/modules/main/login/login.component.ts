import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import {CookieStorageService} from '../../../core/services/cookie-storage.service'
import { ToastrService } from 'ngx-toastr'
let md5 = require('md5')


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login:        any     = FormGroup;
  users:        any     = []
  userSignedIn: boolean = false
  show:          boolean = false

  constructor(private fb:FormBuilder,private router:Router ,
              private cookie :CookieStorageService ,
              private toastr : ToastrService) 
  {}

  ngOnInit(): void {
    this.login = this.fb.group({
     email:    ['',Validators.compose([Validators.required,Validators.email])],
     password: ['',Validators.required]
   })
  }
  password() {
    this.show = !this.show
}
  loginSubmit(data:any){  //called when user press login button 

    let emailaddressvalid = false,
        hashedEmail = btoa(data.email),
        hashedPassword = md5(data.password)
    
    this.users = (localStorage.getItem(hashedEmail)) // geting user from local storage

    if(this.users !== null){
    this.users = JSON.parse(atob(JSON.parse(this.users)))
   
      if(this.users.emailAddress === data.email)  //checking if email match or not 
      {
        emailaddressvalid = true 
       if(this.users.password === hashedPassword)
        {
          this.userSignedIn = true
          this.cookie.addcookie(hashedEmail)
          this.router.navigate(['dashboard'])
        }
      }
    }
      
    if(this.userSignedIn == false){
      if(emailaddressvalid == false)
      this.toastr.error('Please Enter Valid Email Address')
      else
      this.toastr.error('Please enter valid Password')
    }
    else{
      this.toastr.success('Successfuly Logged In')
    }
  }
  
  goToSignUp(){
   this.router.navigate(['signup'])
  }
}
