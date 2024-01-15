import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit, OnDestroy {
  resent = false;
  message: any;
  response = false;
  timeLeft = 25;
  length: number;
  subscription: Subscription[] = [];
  @Input() showVerification: boolean;
  @Input() login: any;
  constructor(
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}
  resend() {}

  public otpNum = new FormGroup({
    num1: new FormControl('', [Validators.required]),
    num2: new FormControl('', [Validators.required]),
    num3: new FormControl('', [Validators.required]),
    num4: new FormControl('', [Validators.required]),
  });
  getOtpNum(start: any, end: any) {
    // autotab to next field
    let field = start.otpNum.value;
    for (const key in field) {
      if (field.hasOwnProperty(key)) {
        const value = field[key].length;
        if (value > 0) {
          this.length = value;
        }
      }
    }
    if (this.length === 1) {
      end.focus();
    }
  }
  // if (this.otpNum.status == 'VALID') {
  //   const otps = this.otpNum.value;
  //   const otp: any = `${otps.num1}${otps.num2}${otps.num3}${otps.num4}`;
  //   console.log(otp);
  //   // this.service.otpValid(otp).subscribe((value) => {
  //   //   console.log(value);
  //   //   if (value) {
  //   //     this.router.navigate(['/dashboard']);
  //   //   }
  //   // });
  //   let payLoad: any = {
  //     phone: `91${this.login.phone}`,
  //     otp,
  //   };
  //   this.subscription.push(
  //     this.service.OtpVerification(payLoad).subscribe({
  //       next: (userData: any) => {
  //         if (userData?.message == 'Successfully login ') {
  //           // this.router.navigate(['/dashboard']);
  //           // this.response = true;
  //           // this.message = userData.message;
  //           // setTimeout(() => {}, 2000);
  //           const returnUrl =
  //             this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  //           this.router.navigateByUrl(returnUrl);
  //           this.service.token = userData.access_token;
  //         } else {
  //           // this.errorMessage = userData.message;
  //         }
  //       },

  //       error: (error: any) => {
  //         this.response = true;
  //         this.message = error.error.message;
  //         setTimeout(() => {
  //           this.response = false;
  //           this.showVerification = false;
  //         }, 3000);
  //       },
  //     })
  //   );
  // }

  getOtpVerify() {
    if (this.otpNum.status == 'VALID') {
      const otps = this.otpNum.value;
      const otp: any = `${otps.num1}${otps.num2}${otps.num3}${otps.num4}`;
      console.log(otp);
      // this.service.otpValid(otp).subscribe((value) => {
      //   console.log(value);
      //   if (value) {
      //     this.router.navigate(['/dashboard']);
      //   }
      // });
      let payLoad: any = {
        phone: `91${this.login.phone}`,
        otp,
      };
      this.subscription.push(
        this.service.OtpVerification(payLoad).subscribe({
          next: (userData: any) => {
            if (userData?.message == 'Successfully login ') {
              const returnUrl =
                this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
              this.router.navigateByUrl(returnUrl);
              this.service.token = userData.access_token;
            } else {
              // this.errorMessage = userData.message;
            }
          },

          error: (error: any) => {
            this.response = true;
            this.message = error.error.message;
            setTimeout(() => {
              this.response = false;
              this.showVerification = false;
            }, 3000);
          },
        })
      );
    }
  }
  otpResend() {
    this.timeLeft = 25;
    this.resent = false;
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    if (!this.resent) {
      setTimeout(() => {
        setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            this.timeLeft = 0;
            this.resent = true;
          }
        }, 1000);
      }, 1000);
    }
  }
}
