import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { customer } from 'src/app/data/customer';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss'],
})
export class RegisterCustomerComponent implements OnInit, OnDestroy {
  confirmed = 'Confirmed Customer';
  editfromExecutive: any;
  editfromAdmin: any;
  confirm = false;
  otpsend = false;
  errmsg = '';
  verifiedOtp = false;
  hideChange = false;
  productDetail: any;
  updateText = false;
  profileData: any = [];
  editSelectedCustomer: any;
  customerId: any;
  verifiedToken: any;
  otpAlert = false;
  otpError = '';
  fill = false;
  qtyError = false;
  disable = false;
  registerError = false;
  profileDataClone: any;
  registerMessage: any;
  subscription: Subscription[] = [];
  registeredCustomer: any;
  updatePhone: any;
  showSend = true;
  resetcust = false;
  resent = false;
  timeLeft = 25;
  errorList = [];
  productStatus: boolean;
  constructor(
    private router: ActivatedRoute,
    private service: SharedService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}
  // private user = {
  //   alloproducts: [
  //     {
  //       id: 1,
  //     },
  //     {
  //       id: 2,
  //     },
  //   ],
  // };
  public customer = this.fb.group({
    name: ['', [Validators.required, Utils.whitespace()]],
    address1: ['', [Validators.required, Utils.whitespace()]],
    address2: [''],
    pin: [
      '',
      [Validators.required, Validators.min(100000), Validators.max(999999)],
    ],
    phone: [
      '',
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
    otp: ['', [Validators.required]],
    email: [
      '',
      [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],
    ],
    employId: '',
    products: this.fb.array([
      this.fb.group({
        id: [''],
        quantity: [1],
      }),
    ]),
  });

  addProduct() {
    this.productDetail = this.customer.get('products') as FormArray;
    this.productDetail.push(this.createProductField());
    console.log(this.productDetail.controls, 'pp');
  }
  getValidity(i: any) {
    this.productStatus = (<FormArray>this.customer.get('products')).controls[
      i
    ].invalid;
  }
  get products() {
    return this.customer.get('products') as FormArray;
  }
  createProductField(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      quantity: new FormControl('1', [Validators.required]),
    });
  }
  changeQuantity(count: any, status: string, index: number) {
    if (status == 'decrement') {
      if (count > 1) count--;
    } else {
      count++;
    }
    this.products?.at(index)?.get('quantity')?.setValue(count);
  }
  hideproductdp(index: number) {
    const ProductArray = this.customer.get('products') as FormArray;
    ProductArray.removeAt(index);
    this.selectProduct();
  }
  selectProduct() {
    const productArray = this.customer.value.products;
    this.profileData.forEach((item: any) => {
      const value = productArray.find((obj) => obj.id == item.id);
      if (value) {
        item.disable = true;
      } else {
        item.disable = false;
      }
    });
  }
  sendOtp() {
    this.timeLeft = 25;
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
    let phnum: any = this.customer.value.phone;
    this.subscription.push(
      this.service.otpSend(phnum).subscribe({
        next: (data: any) => {
          this.registerError = false;
          this.otpsend = true;
        },
        error: (error: any) => {
          if (error.error.statusCode == 409) {
            this.registerError = true;
            this.registeredCustomer = error.error.error.response.data;

            if (this.customer.value.products.length > 0) {
              // const item = this.customer.get('products') as FormArray;
              // item.clear();
              // if (this.registeredCustomer) {
              //   this.registeredCustomer.products.forEach((value: any) => {
              //     const prodata = this.createProductField();
              //     prodata.patchValue(value);
              //     item.controls.push(prodata);
              //     this.profileData.push(value);
              //   });
              // }
            }
          }
          this.otpsend = true;
        },
      })
    );
  }
  resetCustomer() {
    const ProductArray = this.customer.get('products') as FormArray;
    while (ProductArray.length !== 1) {
      ProductArray.removeAt(0);
    }
    this.customer.patchValue({
      name: '',
      address1: '',
      address2: '',
      pin: '',
      phone: '',
      otp: '',
      products: [{ id: '', quantity: 1 }],
      email: '',
    });

    this.otpsend = false;
    this.fill = false;
    this.customer.enable();
    this.disable = false;
    this.editSelectedCustomer = false;
    this.registeredCustomer = false;
    this.resetcust = false;
  }
  viewCustomer() {
    console.log(this.registeredCustomer, 'rerer');
    this.customer.patchValue(this.registeredCustomer);
    const item = this.customer.get('products') as FormArray;
    item.clear();
    if (this.registeredCustomer) {
      this.registeredCustomer.products.forEach((value: any) => {
        const prodata = this.createProductField();
        prodata.patchValue(value);
        item.controls.push(prodata);
        this.profileData.push(value);
      });
    }
    this.customer.disable();
    this.disable = true;
    this.resetcust = true;
    this.updateText = false;
    this.registerError = false;
  }
  otpResend() {
    this.timeLeft = 25;
    this.resent = false;
    this.otpAlert = false;
    this.customer.patchValue({ otp: '' });
  }
  verifyOtp() {
    let otpnum: any = this.customer.value.otp;
    let phnum: any = this.customer.value.phone;
    this.subscription.push(
      this.service.verifiedOtp(otpnum, phnum).subscribe({
        next: (data: any) => {
          this.verifiedOtp = true;
          this.verifiedToken = data.token;
          console.log(this.verifiedToken, 'verified token');
        },
        error: (error: any) => {
          this.otpAlert = true;
          this.otpError = 'Invalid otp';
        },
      })
    );
  }
  getCustomerData() {
    this.customer.controls['phone'].enable();

    this.fill = true;
    const token = this.authService.token;
    const splitedToken = Utils.parseJwt(token);
    let selectedProduct: any = this.customer.value.products;
    selectedProduct.map((item: any) => {
      const product = this.profileData.find((obj: any) => obj.id == item.id);
      item['name'] = product.name;
      return item;
    });

    let customerData: any = {
      name: this.customer.value.name,
      address1: this.customer.value.address1,
      address2: this.customer.value.address2,
      pin: this.customer.value.pin.toString(),
      phone: `91${this.customer.value.phone}`,
      products: selectedProduct,
      employId: splitedToken.employId,
      // employId: this.editSelectedCustomer ? this.editSelectedCustomer.employId : splitedToken.employId,
      email: this.customer.value.email,
    };
    if (this.updatePhone != this.customer.value.phone) {
      customerData.token = this.verifiedToken;
    } else {
      this.customer?.get('otp')?.clearValidators();
      this.customer?.get('otp')?.updateValueAndValidity();
    }
    if (this.customer.status == 'VALID') {
      this.subscription.push(
        this.service.saveCustomerData(customerData, this.customerId).subscribe({
          next: (data: any) => {
            if (data) {
              this.customer?.get('otp')?.setValidators([Validators.required]);
              this.customer?.get('otp')?.updateValueAndValidity();
              this.confirm = true;
              setTimeout(() => {
                this.confirm = false;
              }, 3000);
              this.fill = false;
              const ProductArray = this.customer.get('products') as FormArray;
              while (ProductArray.length !== 1) {
                ProductArray.removeAt(0);
              }
              this.customer.patchValue({
                name: '',
                address1: '',
                address2: '',
                pin: '',
                phone: '',
                otp: '',
                products: [{ id: '', quantity: 1 }],
                email: '',
              });
              this.verifiedOtp = false;
              this.otpsend = false;
              this.otpAlert = false;
              this.qtyError = false;
              if (this.editfromExecutive) {
                this.confirm = false;
                this.service.setPopups({
                  status: true,
                  // right: '50%',
                  // bottom: '28%',
                  message: 'Customer updated successfully',
                });

                setTimeout(() => {
                  this.service.setPopups({
                    status: false,
                  });
                }, 3000);
                this.route.navigate(['/dashboard/customer-data']);
              }

              if (this.editfromAdmin) {
                this.confirm = false;
                this.service.setPopups({
                  status: true,
                  // right: '50%',
                  // bottom: '28%',
                  message: 'Customer updated successfully',
                });

                setTimeout(() => {
                  this.service.setPopups({
                    status: false,
                  });
                }, 4000);
                this.route.navigate(['/dashboard/monitor-customer-data']);
              }
            }
          },
          error: (error: any) => {
            this.customer.controls['phone'].disable();

            if (error.error.statusCode == 409) {
              // this.registerError = true;
              setTimeout(() => {
                this.registerError = false;
                this.verifiedOtp = false;
                this.otpsend = false;
              }, 5000);
            }
            if (error.error.statusCode == 400) {
              this.qtyError = true;
              if (error.error.message.includes('token')) {
                this.errmsg = error.error.message;
              }
              this.errorList = error.error.error.response.message;

              setTimeout(() => {
                this.qtyError = false;
              }, 5000);
            }
          },
        })
      );
    }
  }
  executiveProfile() {
    this.subscription.push(
      this.service.getProfile().subscribe((data: any) => {
        if (data?.allocatedProducts?.length > 0 && this.profileData.length == 0)
          this.profileData = data?.allocatedProducts;
        this.profileDataClone = Utils.getClonedData(this.profileData);
      })
    );
  }
  changeNum() {
    this.customer.controls['phone'].enable();
    this.customer.controls['phone'].reset();
    this.hideChange = false;
  }
  ngOnDestroy(): void {
    this.updatePhone = '';
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  getProductavailability(index: number) {
    const selectedProduct = this.customer.value.products[index];
    const status = this.errorList?.find(
      (err: any) => err.id === selectedProduct.id
    );
    return status ? status.message : false;
  }

  ngOnInit(): void {
    this.profileData = [];
    this.subscription.push(
      this.router.params.subscribe((data) => {
        if (data?.['id']) {
          this.editSelectedCustomer = history.state.customerData;
          this.hideChange = true;
          this.editfromAdmin = history.state.redirectfromAdmin;
          this.editfromExecutive = history.state.redirectfromExecutive;
          if (this.editSelectedCustomer) {
            this.customerId = data?.['id'];

            if (
              this.editSelectedCustomer.phone &&
              this.editSelectedCustomer.phone.length > 10
            ) {
              this.editSelectedCustomer.phone = this.editSelectedCustomer?.phone
                .slice(2, 12)
                .toString();
            }

            this.updatePhone = Utils.getClonedData(
              this.editSelectedCustomer.phone
            );
            this.customer.patchValue(this.editSelectedCustomer);
            this.customer.controls['phone'].disable();

            if (this.customer.value.products.length > 0) {
              const item = this.customer.get('products') as FormArray;
              item.clear();

              this.editSelectedCustomer.products.forEach((value: any) => {
                const prodata = this.createProductField();
                this.profileData.push(value);
                prodata.patchValue(value);
                item.controls.push(prodata);
              });
            }

            this.disable = true;
          }
          this.updateText = true;
        }
      })
    );

    this.executiveProfile();
    // this.addProduct();
  }
}
