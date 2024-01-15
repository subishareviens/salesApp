import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './adminLogin/adminLogin.component';
import { VerificationComponent } from './verification/verification.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLoginComponent,
  },
  {
    path: 'user',
    component: UserloginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
