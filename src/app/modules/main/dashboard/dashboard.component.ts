import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {CookieStorageService} from '../../../core/services/cookie-storage.service'
import { MatDialog , MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { UpdateUserDetailsDialogComponent } from './update-user-details-dialog/update-user-details-dialog.component';
import { UpdatePasswordDetailsDailogComponent } from './update-password-details-dailog/update-password-details-dailog.component';
import { ToastrService } from 'ngx-toastr';

var md5 = require('md5')

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  constructor(  private router: Router, private dialog: MatDialog,
                private cookieStorage :CookieStorageService,
                private cookie: CookieService, 
                private toastr : ToastrService) {}

  cookiestring:     any = ' ';
  users:            any = [];  // get  user coming from local storage 
  imageUrl:         any = ' ';
  dashboardUserObj: any = {};  
  updateUserObj:    any = {};   // object coming after updating in dailog 

  ngOnInit(): void {

    this.cookiestring = this.getCookieString('sesion_id')
    this.users = JSON.parse(atob(JSON.parse(
                 localStorage.getItem(this.cookiestring))))

    this.dashboardUserObj = { ...this.users } // update dashboard user from local storage user data

    if (this.users.emailAddress === this.cookiestring) {
      this.dashboardUserObj = this.users;
    }

    this.updateUserObj = { ...this.dashboardUserObj } 
    this.imageUrl =(localStorage.getItem(btoa(this.dashboardUserObj.emailAddress+'@')))
    this.imageUrl = (atob(JSON.parse(this.imageUrl)))
  }

  logOut(){
    this.cookie.delete('sesion_id')
    this.router.navigate(['login'])
  }
  getCookieString(cname: String) {
    let name          = cname + '=',
        decodedCookie = decodeURIComponent(document.cookie),
        ca            = decodedCookie.split(';')

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        console.log(c.substring(name.length, c.length))
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  openDialog(): void {        // dailog for edit details 
    const dialogRef = this.dialog.open(UpdateUserDetailsDialogComponent, {
      width: '60%',
      data: this.updateUserObj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.toastr.success('Updated Successfully')
      if (result != undefined) {                     // checking if user updated or not 
        result = {                                   
          userId: this.dashboardUserObj.userId,
          password: this.dashboardUserObj.password,
          confirmPassword: this.dashboardUserObj.confirmPassword,
          ...result,
        };

        
        let newEmail = btoa(result.emailAddress)
        let oldEmail = this.dashboardUserObj.emailAddress
        this.cookieStorage.addcookie(newEmail)
        //geting image url from cookie 
        this.imageUrl =(localStorage.getItem(btoa(this.dashboardUserObj.emailAddress+'@')))
        this.imageUrl = (atob(JSON.parse(this.imageUrl)))
        
        this.dashboardUserObj = { ...result } // updating dashboard with update details

        localStorage.removeItem(btoa(oldEmail)); //removing user data in local storage 
        localStorage.removeItem(btoa(oldEmail+'@')) // removing img pair in local storage 

        let body  = btoa(JSON.stringify(result)),
            email = btoa(result.emailAddress),
            key   = btoa(result.emailAddress+'@')

        localStorage.setItem(email, JSON.stringify(body)) // setting new pair in local storage 
        localStorage.setItem(key, JSON.stringify(btoa(this.imageUrl)))

      }
    })
  }
 
  passwordDialog(){        //paswword dialog
    const dialogRef = this.dialog.open(UpdatePasswordDetailsDailogComponent, {
      width: '40%',
      data : {password : this.dashboardUserObj.password}
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {   
        this.toastr.success('Password Updated Successfully')

        const localStorageKey = btoa(this.dashboardUserObj.emailAddress),
              localstorageObj= JSON.parse(atob(JSON.parse(
                               localStorage.getItem(localStorageKey))))
                               
        // updating password in local storage
        localstorageObj.password        = md5(result.newPassword)  
        localstorageObj.confirmPassword = md5(result.confirmPassword)
        

        let body = btoa(JSON.stringify(localstorageObj))

        localStorage.setItem(localStorageKey,JSON.stringify((body)))
        window.location.reload()
      }
    })
  }
}
