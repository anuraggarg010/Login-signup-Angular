import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from "@interceptors/api.interceptor";
import { MainModule } from "./modules/main/main.module";
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { UpdateUserDetailsDialogComponent } from './modules/main/dashboard/update-user-details-dialog/update-user-details-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdatePasswordDetailsDailogComponent} from './modules/main/dashboard/update-password-details-dailog/update-password-details-dailog.component'



@NgModule({
  declarations: [
    AppComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    FormsModule,
    HttpClientModule,
        
    ReactiveFormsModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }, {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        autoFocus: false,
        disableClose: true
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[UpdateUserDetailsDialogComponent,UpdatePasswordDetailsDailogComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
