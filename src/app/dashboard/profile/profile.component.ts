import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { Utils } from 'src/app/utils/utils';
declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private service: SharedService,
    private route: Router,
    private renderer: Renderer2
  ) {}
  userData: any;
  role = '';
  edit = false;
  view = true;
  mismatch = false;
  newUser: any;
  newPassword: any;
  updatePass = false;
  showpassword = true;
  shownewpassword = true;
  showTab = false;
  // [navigate]="'dashboard/profile'"
  // showChange = true;
  subscription: Subscription[] = [];
  public profile = new FormGroup({
    password: new FormControl('', [Validators.required, Utils.whitespace()]),
    confirmpassword: new FormControl(''),
  });
  public updateProfile = new FormGroup({
    name: new FormControl('', [Validators.required, Utils.whitespace()]),
    email: new FormControl('', [Validators.required, Utils.whitespace()]),
  });
  editProfile() {
    this.edit = true;
    this.view = false;
    this.updateProfile.patchValue({
      email: this.userData.email,
      name: this.userData.name,
    });
  }
  showPassword() {
    this.showpassword = !this.showpassword;
  }
  shownewPassword() {
    this.shownewpassword = !this.shownewpassword;
  }
  saveProfile() {
    this.edit = false;
    this.view = true;
    let user = this.updateProfile.value;
    this.subscription.push(
      this.service.updateAdminProfile(user).subscribe((data: any) => {
        this.newUser = data;
        this.service.setPopups({
          status: true,
          // right: '50%',
          // bottom: '55%',
          message: 'Profile updated',
        });

        setTimeout(() => {
          this.service.setPopups({
            status: false,
          });
        }, 2500);
      })
    );
  }
  openPassword() {
    let dd3 = document.getElementById('home');
    let dd4 = document.getElementById('profile');
    this.renderer.removeClass(dd3, 'show');
    this.renderer.removeClass(dd3, 'active');
    this.renderer.addClass(dd4, 'show');
    this.renderer.addClass(dd4, 'active');
    this.showTab = true;
  }
  navigateRoute() {
    if (this.showTab || this.edit) {
      // document.getElementById('profile-tab').click();
      this.showTab = false;
      this.edit = false;
      this.view = true;
    } else {
      this.route.navigate(['dashboard']);
    }
  }
  changePassword() {
    const password = this.profile.value.password;
    const newPassword = this.profile.value.confirmpassword;
    if (password == newPassword && this.profile.status == 'VALID') {
      const updatePassword = { password: password };
      this.subscription.push(
        this.service
          .updateAdminProfile(updatePassword)
          .subscribe((data: any) => {
            this.newPassword = data;
            this.updatePass = true;
            this.service.setPopups({
              status: true,
              // right: '50%',
              // bottom: '50%',
              message: 'Changed password',
            });

            setTimeout(() => {
              this.service.setPopups({
                status: false,
              });
            }, 2500);
            this.openProfileTab();
            // this.renderer.removeClass(dd, 'active');
          })
      );
    } else {
      this.mismatch = true;
    }
  }
  openProfileTab() {
    let dd1 = document.getElementById('password-tab');
    let dd2 = document.getElementsByClassName('profile-tab1')[0];
    this.renderer.removeClass(dd1, 'active');
    this.renderer.addClass(dd2, 'active');
    let dd3 = document.getElementById('home');
    let dd4 = document.getElementById('profile');
    this.renderer.removeClass(dd4, 'show');
    this.renderer.removeClass(dd4, 'active');
    this.renderer.addClass(dd3, 'show');
    this.renderer.addClass(dd3, 'active');

    this.showTab = false;
    this.view = true;
  }
  clear() {
    this.profile.reset();
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.subscription.push(
      this.service.getProfile().subscribe((data: any) => {
        this.userData = data;
      })
    );
  }
}
