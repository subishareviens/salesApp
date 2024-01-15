import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userLogin } from 'src/app/data/user';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.scss'],
})
export class AdminLoginComponent implements OnInit, OnDestroy {
  showVerification = false;
  errorMessage = '';
  login: any;
  successMessage: any;
  showpassword = true;
  error = false;
  subscription: Subscription[] = [];
  constructor(
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  showPassword() {
    this.showpassword = !this.showpassword;
  }
  public loginUser = new FormGroup({
    // role: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    // phone: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    // ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern(
      //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      // ),
    ]),
    credential: new FormControl(false),
  });

  // hideField() {
  //   if (this.loginUser?.get('role')?.value == 'Master admin') {
  //     this.loginUser?.get('phone')?.clearValidators();
  //     this.loginUser?.get('phone')?.updateValueAndValidity();
  //     console.log(this.loginUser, 'cc');
  //   } else if (this.loginUser?.get('role')?.value == 'Sales executive') {
  //     this.loginUser?.get('email')?.clearValidators();
  //     this.loginUser?.get('email')?.updateValueAndValidity();
  //     this.loginUser?.get('password')?.clearValidators();
  //     this.loginUser?.get('password')?.updateValueAndValidity();
  //   }
  // }

  getUserLogin() {
    this.login = this.loginUser.value;
    // let role = this.loginUser.value.role;
    console.log(this.loginUser, 'kk');
    // this.router.navigate(['/dashboard']);
    if (this.loginUser.status == 'VALID') {
      // if (role == 'Sales executive') {
      //   this.showVerification = true;

      // let payLoad: any = { role: login.role, phone: login.phone };
      // this.service.OtpVerification(payLoad).subscribe((otp) => {
      //   console.log(otp, 'otp');
      //   if (otp) {
      //     this.showVerification = true;
      //     this.router.navigate(['/dashboard']);
      //   }
      // });
      // } else if (role == 'Master admin') {
      let payLoad: any = {
        // role: this.login.role,
        password: this.login.password,
        email: this.login.email,
      };
      this.subscription.push(
        this.service.saveUser(payLoad).subscribe({
          next: (userData: any) => {
            console.log(userData, 'rr');
            if (userData?.statusCode == 200) {
              // this.router.navigate(['/dashboard']);
              this.successMessage = userData.message;

              const returnUrl =
                this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
              this.router.navigateByUrl(returnUrl);

              this.service.token = userData.access_token;
            } else {
              // this.errorMessage = userData.message;
            }
          },
          error: (error: any) => {
            this.error = true;
            this.errorMessage = error.error.message;
            setTimeout(() => {
              this.error = false;
            }, 5000);
          },
        })
      );
      // }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {}
}
