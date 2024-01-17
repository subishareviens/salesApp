import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  providers: [DatePipe],
})
export class DashboardHomeComponent implements OnInit {
  subscription: Subscription[] = [];
  confirmed = 'Loggedin Successfully';
  roles = '';
  manaEx = false;
  monitor = false;
  isProduct = false;
  activeExecutive = false;
  activeView = false;
  activeProduct = false;
  showProfile = true;
  confirm = false;
  constructor(
    private service: SharedService,
    private router: Router,
    private authService: AuthService,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'enable-header');
    const previousRoute = this.router
      .getCurrentNavigation()
      .previousNavigation?.finalUrl?.toString();
    if (previousRoute == '/' || previousRoute == '/user') {
      this.confirm = true;
      setTimeout(() => {
        this.confirm = false;
      }, 3000);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeExecutive = event.url.includes('executive');
        this.activeView = event.url.includes('monitor');
        this.activeProduct = event.url.includes('products');
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const element = document.querySelectorAll('.nav-li');
    element.forEach((obj: any) => {
      const targetElement = obj.contains(event.target);
      if (targetElement) {
        if (obj.classList.contains('navactive')) {
          this.renderer.removeClass(obj, 'navactive');
        } else {
          this.renderer.addClass(obj, 'navactive');
        }
      } else {
        this.renderer.removeClass(obj, 'navactive');
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
    this.renderer.removeClass(document.body, 'enable-header');
  }
  ngOnInit(): void {
    const token = this.authService.token;
    const splitedToken = Utils.parseJwt(token);
    let userRole = splitedToken.role;
    this.roles = userRole;
  }
}
