import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Utils } from '../utils';
import { SharedService } from 'src/app/service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() roles: any;
  openBt = false;
  role: any;
  user: any;
  subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private service: AuthService,
    private _service: SharedService,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {}
  openProfile() {
    this.router.navigate(['/dashboard/profile']);
  }
  openButtons() {
    this.openBt = !this.openBt;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const element = document.querySelectorAll('.profile');
    element.forEach((obj: any) => {
      const targetElement = obj.contains(event.target);
      if (targetElement) {
        if (obj.classList.contains('showBt')) {
          this.renderer.removeClass(obj, 'showBt');
        } else {
          this.renderer.addClass(obj, 'showBt');
        }
      } else {
        this.renderer.removeClass(obj, 'showBt');
      }
    });
    // const ele = document.querySelector('.profile');
    // const targetElement = this.eRef.nativeElement.contains(event.target)
  }
  logout() {
    this._service.setPopup({
      status: true,
      right: '23%',
      bottom: '12%',
      message: 'Successfully Logout',
      class: 'custom-position',
    });

    setTimeout(() => {
      this._service.setPopup({ status: false });
    }, 2500);

    if (this.role == 'master') {
      this.router.navigate(['']);
    } else if (this.role == 'sales executive') {
      this.router.navigate(['user']);
    }
    this.service.clearStorage();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    const token = this.service.token;
    const splitedToken = Utils.parseJwt(token);
    this.role = splitedToken.role;
    this.subscription.push(
      this._service.getProfile().subscribe((data: any) => {
        this.user = data?.name?.substring(0, 1);
      })
    );
  }
}
