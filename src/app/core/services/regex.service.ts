import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})

export class RegexService {

constructor(private http: HttpClient){}



changeUrl:any = environment.ap_nodeServerUrl
uploadurl:any = environment.ap_nodeServerUrl
  
changeImage(filename:string,chunks:string, index:number, length:number){

  const body = {
    fileName   : filename,
    fileData   : chunks,
    totalChunks: length,
    chunkIndex : index
  }
  console.log(body)
  return this.http.post(this.changeUrl + '/uploadFilePart', body)
}

uploadImage(fileName:string){
  const body = {
    fileName:fileName
  }
  return this.http.post(this.uploadurl+'/uploadFile',body)
}
}