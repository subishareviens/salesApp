import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { AdminLoginComponent } from './adminLogin/adminLogin.component';
import { VerificationComponent } from './verification/verification.component';
import { UserloginComponent } from './userlogin/userlogin.component';

@NgModule({
  declarations: [AdminLoginComponent, VerificationComponent, UserloginComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule],
})
export class LoginModule {}
