import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SharedService } from '../service/shared.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
    const previousRoute = this.router
      .getCurrentNavigation()
      .previousNavigation?.finalUrl?.toString();
    if (previousRoute == '/' || previousRoute == '/user') {
      // this.service.setPopup({
      //   status: true,
      //   top: '90px',
      //   right: '153px',
      //   message: 'Login Successful',
      // });
      this.confirm = true;
      setTimeout(() => {
        // this.service.setPopup({ status: false });
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
  ngOnInit(): void {
    const token = this.authService.token;
    const splitedToken = Utils.parseJwt(token);
    let userRole = splitedToken.role;
    this.roles = userRole;
  }
}
