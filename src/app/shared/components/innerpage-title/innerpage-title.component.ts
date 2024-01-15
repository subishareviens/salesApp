import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-innerpage-title',
  templateUrl: './innerpage-title.component.html',
  styleUrls: ['./innerpage-title.component.scss'],
})
export class InnerpageTitleComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() navigate: boolean;
  constructor(private router: Router) {}

  navigateRoute() {
    if (this.navigate) {
      this.navigate = false;
    } else {
      this.router.navigate(['dashboard']);
    }
  }
  ngOnInit(): void {}
}
