import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-executive',
  templateUrl: './add-executive.component.html',
  styleUrls: ['./add-executive.component.scss'],
})
export class AddExecutiveComponent implements OnInit, OnDestroy {
  constructor(
    private router: ActivatedRoute,
    private service: SharedService,
    private route: Router
  ) {}

  otpsend = false;
  verifiedOtp = false;
  confirm = false;
  verifiedToken = '';
  editSelectedUser: any;
  updateText = false;
  fill = false;
  otpError: any;
  otpAlert = false;
  allocProduct: any;
  userExist = false;
  userId: any;
  employeeExist = false;
  updated = false;
  product = false;

  popTop = '25%';
  confirmed = 'Confirmed Executive';
  subscription: Subscription[] = [];
  public employee = new FormGroup({
    name: new FormControl('', [Validators.required, Utils.whitespace()]),
    employId: new FormControl('', [Validators.required, Utils.whitespace()]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      // Validators.minLength(1000000000),
      // Validators.maxLength(10000000000),
    ]),
    // otp: new FormControl('', [Validators.required]),
  });

  // sendOtp() {
  //   this.otpsend = true;
  // }
  // verifyOtp() {
  //   let otpnum: any = this.employee.value.otp;
  //   let phnum: any = this.employee.value.phone;
  //   this.service.verifiedOtp(otpnum, phnum).subscribe({
  //     next: (data: any) => {
  //       this.verifiedOtp = true;
  //       this.verifiedToken = data.token;
  //       console.log(this.verifiedToken, 'verified token');
  //     },
  //     error: (error: any) => {
  //       this.otpAlert = true;
  //       this.otpError = 'Invalid otp';
  //     },
  //   });
  //   console.log(this.employee);
  // }

  saveEmployee() {
    console.log(this.employee);
    this.fill = true;
    if (this.employee.status == 'VALID') {
      let employeeData = {
        name: this.employee.value.name,
        role: 'sales executive',
        employId: this.employee.value.employId,
        phone: `91${this.employee.value.phone}`,
        // token: this.verifiedToken,
      };
      console.log(employeeData, 'eee');
      this.fill = true;
      this.subscription.push(
        this.service.saveExecutiveData(employeeData).subscribe({
          next: (data: any) => {
            this.confirm = true;
            setTimeout(() => {
              this.confirm = false;
            }, 3000);
            this.employee.reset();
            this.userExist = false;
            // this.verifiedOtp = false;
            // this.otpsend = false;
            this.fill = false;
            // this.otpAlert = false;
          },
          error: (error: any) => {
            // if (error.error.statusCode == 409) {
            //   this.userExist = true;
            //   setTimeout(() => {
            //     this.userExist = false;
            //   }, 2000);
            // }
            if (error.error.message.includes('employ ID')) {
              this.employeeExist = true;
              setTimeout(() => {
                this.employeeExist = false;
              }, 3000);
            }
            if (error.error.message.includes('phone')) {
              this.userExist = true;
              setTimeout(() => {
                this.userExist = false;
              }, 3000);
            }
          },
        })
      );
    }
  }
  removeProduct(i: number) {
    this.allocProduct.splice(i, 1);
  }
  updateEmployee() {
    if (this.employee.status == 'VALID') {
      let updateEmployeeData = {
        name: this.employee.value.name,
        role: 'sales executive',
        employId: this.employee.value.employId,
        // token: this.verifiedToken,
        phone: `91${this.employee.value.phone}`,
        allocatedProducts: this.allocProduct,
      };

      // this.route.navigate(['/dashboard/edit-executive'], {
      //   state: { redirectfromAdd: true },
      // });
      this.subscription.push(
        this.service
          .updateUserProfile(updateEmployeeData, this.userId)
          .subscribe({
            next: (data: any) => {
              this.service.setPopups({
                status: true,
                // right: '50%',
                // bottom: '28%',
                message: 'Executive updated successfully',
              });
              setTimeout(() => {
                this.service.setPopups({
                  status: false,
                });
              }, 4000);
              this.route.navigate(['/dashboard/edit-executive'], {
                state: { redirectfromAdd: true },
              });
            },
            error: (error: any) => {
              if (error.error.message.includes('ID')) {
                this.employeeExist = true;
                setTimeout(() => {
                  this.employeeExist = false;
                }, 3000);
              }
              if (error.error.message.includes('number')) {
                this.userExist = true;
                setTimeout(() => {
                  this.userExist = false;
                }, 3000);
              }
            },
          })
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    const editInfo = this.router.params.subscribe((data) => {
      if (data?.['id']) {
        this.editSelectedUser = history.state.userData;
        this.userId = data?.['id'];
        if (this.editSelectedUser) {
          if (
            this.editSelectedUser.phone &&
            this.editSelectedUser.phone.length > 10
          ) {
            this.editSelectedUser.phone = this.editSelectedUser?.phone
              .slice(2, 12)
              .toString();
          }
          this.product = true;
          this.allocProduct = this.editSelectedUser?.allocatedProducts;
          if (this.allocProduct == '') {
            this.product = false;
          }
          this.employee.patchValue(this.editSelectedUser);
          this.updateText = true;
          //update the form data
          // this.employee.controls['employId'].disable();
        }
      }
    });
  }
}
