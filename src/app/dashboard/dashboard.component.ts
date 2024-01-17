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

  confirm = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.token;
    const splitedToken = Utils.parseJwt(token);
    let userRole = splitedToken.role;
    this.roles = userRole;
  }
}
