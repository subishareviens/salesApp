import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../utils/header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { SalesDataComponent } from './sales-data/sales-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MonitorCustomerDataComponent } from './monitor-customer-data/monitor-customer-data.component';
import { ProductsComponent } from './products/products.component';
import { AddExecutiveComponent } from './add-executive/add-executive.component';
import { EditExecutiveComponent } from './edit-executive/edit-executive.component';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductAllocationComponent } from '../shared/components/product-allocation/product-allocation.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    RegisterCustomerComponent,
    CustomerDataComponent,
    SalesDataComponent,
    MonitorCustomerDataComponent,
    ProductsComponent,
    AddExecutiveComponent,
    EditExecutiveComponent,
    AddProductComponent,
    ProductAllocationComponent,
    DashboardHomeComponent,
  ],
  imports: [
    CarouselModule,
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
  ],
})
export class DashboardModule {}
