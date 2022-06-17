import { Component, Inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl,FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CustomValidatorsService } from '@services/custom-validators.service'
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '@services/util.service';


@Component({
  selector: 'app-update-password-details-dailog',
  templateUrl: './update-password-details-dailog.component.html',
  styleUrls: ['./update-password-details-dailog.component.scss']
})
export class UpdatePasswordDetailsDailogComponent implements OnInit {
  updatePasswordForm: FormGroup
  show:boolean = false;

  constructor( private cookie:CookieService,
    private dialog:MatDialogRef<UpdatePasswordDetailsDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb    : FormBuilder,
    private toster: ToastrService,
    private util  : UtilService,
    private customValidators : CustomValidatorsService) { }

  ngOnInit(): void {
    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword  : ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    },{
      validators: [ this.customValidators.mustMatch('newPassword', 'confirmPassword'),
                    this.util.password('oldPassword',this.data.password)]
    }
    );
  
  }



  get f(){
   
    return this.updatePasswordForm.controls
  }


  onNoClick(){
    this.toster.show('Password not updated')
    this.dialog.close()
  }

}
