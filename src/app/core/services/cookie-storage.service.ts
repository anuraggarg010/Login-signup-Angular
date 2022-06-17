import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})

export class CookieStorageService {

  constructor(private cookie : CookieService) {}

  addcookie(data: any){
    
    let email = data
    let date = new Date()
    date.setDate(date.getTime()+(10*60*1000))
   this.cookie.set('sesion_id',email,{
     secure : true,
     sameSite:'Strict',
     expires:date
   } )
  }

  removecookie(data: any){
    this.cookie.delete('sesion_id',data.email)
  }


}
