import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-sales-data',
  templateUrl: './sales-data.component.html',
  styleUrls: ['./sales-data.component.scss'],
})
export class SalesDataComponent implements OnInit, OnDestroy {
  productData: any;
  subscription: Subscription[] = [];
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.subscription.push(
      this.service.getProfile().subscribe((data: any) => {
        this.productData = data;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
