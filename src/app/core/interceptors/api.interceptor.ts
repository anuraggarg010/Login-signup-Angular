import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(

  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request.headers.set('Content-Type','application/json')
  
    return next.handle(request).pipe(
        catchError((error:HttpErrorResponse)=>{
          let errorMsg = ''
          if(error.error instanceof ErrorEvent){
            errorMsg = `Error: ${error.error.message}`
          }else{
            errorMsg = `Error Code:${error.status},
            Message: ${error.message}`
          }
          return throwError(errorMsg)
        })
    )
  
}
}
