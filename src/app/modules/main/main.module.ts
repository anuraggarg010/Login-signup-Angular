import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from "ngx-toastr";
import { LoginGuard } from "@guards/login.guard";
import { UpdateUserDetailsDialogComponent } from './dashboard/update-user-details-dialog/update-user-details-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatePasswordDetailsDailogComponent } from './dashboard/update-password-details-dailog/update-password-details-dailog.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UpdateUserDetailsDialogComponent,
    UpdatePasswordDetailsDailogComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      preventDuplicates: true,
      maxOpened: 4,
      autoDismiss: true,
      enableHtml: true,

    })
  ],
  providers: [LoginGuard]
})

export class MainModule { }
