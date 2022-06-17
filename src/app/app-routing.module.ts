import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@guards/login.guard';
import { DashboardComponent } from './modules/main/dashboard/dashboard.component';
import { UpdateUserDetailsDialogComponent } from './modules/main/dashboard/update-user-details-dialog/update-user-details-dialog.component';
import { LoginComponent } from './modules/main/login/login.component';

import { SignupComponent } from './modules/main/signup/signup.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
   
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'updateuser',
    component: UpdateUserDetailsDialogComponent
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full',
    canActivate:[LoginGuard]
  },
  {
    path:'**',
    redirectTo:'login'
  }
  

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
