import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private cookie: CookieService ,private router: Router){

  }
   canActivate(): boolean {
    console.log("entered")
    console.log(this.cookie.check('sesion_id'))
    if(this.cookie.get('sesion_id') === ''){
     this.router.navigate(['login'])
      return false;
    }

    return true;
  }
}
function typeOf(arg0: string): any {
  throw new Error('Function not implemented.');
}

