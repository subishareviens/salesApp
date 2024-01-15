import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
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
  userData: any;
  role: any;
  listData: any;
  listDaily: any;
  dailyCustomer: number;
  totalProducts: number;
  totalSales: number;
  myDate: any;
  listDataClone: any;
  constructor(
    private datePipe: DatePipe,
    private service: SharedService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'enable-header');

    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  userProfile() {
    this.subscription.push(
      this.service.getProfile().subscribe((data: any) => {
        this.userData = data;
        this.totalProducts = this.userData.allocatedProducts.reduce(
          (acc: any, obj: any) => acc + obj.totalQuantity,
          0
        );
        this.totalSales = this.userData.allocatedProducts.reduce(
          (acc: any, obj: any) => acc + (obj.totalQuantity - obj.quantity),
          0
        );
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
    this.renderer.removeClass(document.body, 'enable-header');
  }

  ngOnInit(): void {
    const token = this.authService.token;
    const splitedToken = Utils.parseJwt(token);
    let userRole = splitedToken.role;
    this.role = userRole;
    this.userProfile();

    this.subscription.push(
      this.service.getCustomerData().subscribe((item: any) => {
        this.listData = item?.data;

        this.listDataClone = Utils.getClonedData(this.listData);
        this.listDaily = this.listDataClone.filter(
          (obj: any) =>
            new Date(obj.createdAt).toDateString() == new Date().toDateString()
        );
        this.dailyCustomer = this.listDaily.length;
      })
    );
  }
}
