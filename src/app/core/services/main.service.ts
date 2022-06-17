import{HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MainService {
 baseUrl :any = environment.ap_nodeServerUrl;
  constructor(private http:HttpClient) {}
  getUser(){
    
  }
}
