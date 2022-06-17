import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from '@services/regex.service'
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-update-user-details-dialog',
  templateUrl: './update-user-details-dialog.component.html',
  styleUrls: ['./update-user-details-dialog.component.scss']
})

export class UpdateUserDetailsDialogComponent implements OnInit {
 


  updateForm: any = FormGroup
  user: any ={}
  userSubmitted : boolean = false
  fileName: string;
  endUrl: any;
  constructor(private fb: FormBuilder,
              private dialog:MatDialogRef<UpdateUserDetailsDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) public data:any,
      private regex:RegexService,
      private toster:ToastrService) {}

  ngOnInit(): void {

  
  }

  chunkSubstr(str:any,size:number) {
    const numChunks:number = Math.ceil(str.length / size),
          chunks           = new Array(numChunks)
  
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
    }
  
    return chunks
  }

  async getbase64(file){
    return new Promise((resolve,reject)=>{
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = ()    => resolve(reader.result)
      reader.onerror= error => reject(error)
    })
  }
  server(i:number,chunks:string[]){
    this.regex.changeImage(this.fileName, chunks[i], i, chunks.length).subscribe(res=>{
      i++
      if(i === chunks.length){
        this.regex.uploadImage(this.fileName).subscribe(res=>{
          let key = btoa(this.data.emailAddress+'@')
          this.toster.success('Pic Updates Successfully')
          this.endUrl=res['data']['response']['url']
          localStorage.removeItem(key)
          localStorage.setItem(key,JSON.stringify(btoa(this.endUrl)))
        })
        return 'uploded'
      }else{
        this.server(i,chunks)
      }
    })
  }

  async changeImage(event){
    const file               = event.target.files[0],
          var64   :any       = await this.getbase64(file),
          imageFile          = <File>event.target.files[0],
          title   : string   = imageFile.name.split('.')[0],
          uuid    : string   = uuidv4().toString(),
          fileExt : string   = imageFile.name.split('?')[0].split('.').pop(),
          chunks  : string[] = this.chunkSubstr(var64.split(',')[1],100000)
          this.fileName      = title + '_' + uuid + '.' + fileExt
          this.server(0,chunks)
  }

onNoClick(): void {
  this.dialog.close()
}

}



