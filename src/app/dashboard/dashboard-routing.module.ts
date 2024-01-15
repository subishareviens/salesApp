import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { SalesDataComponent } from './sales-data/sales-data.component';
import { MonitorCustomerDataComponent } from './monitor-customer-data/monitor-customer-data.component';
import { ProductsComponent } from './products/products.component';
import { AddExecutiveComponent } from './add-executive/add-executive.component';
import { EditExecutiveComponent } from './edit-executive/edit-executive.component';
import { AddProductComponent } from './add-product/add-product.component';
import { Role } from '../helpers/authguard/constants/role';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'register-customer',
        component: RegisterCustomerComponent,
        data: { roles: [Role.Executive] },
      },
      {
        path: 'register-customer/:id',
        component: RegisterCustomerComponent,
        data: { roles: [Role.Executive] },
      },
      {
        path: 'customer-data',
        component: CustomerDataComponent,
        data: { roles: [Role.Executive] },
      },
      {
        path: 'sales-data',
        component: SalesDataComponent,
        data: { roles: [Role.Executive] },
      },
      {
        path: 'add-executive',
        component: AddExecutiveComponent,
        data: { roles: [Role.Admin] },
      },
      {
        path: 'add-executive/:id',
        component: AddExecutiveComponent,
        data: { roles: [Role.Admin] },
      },
      {
        path: 'edit-executive',
        component: EditExecutiveComponent,
        data: { roles: [Role.Admin] },
      },
      {
        path: 'monitor-customer-data',
        component: MonitorCustomerDataComponent,
        data: { roles: [Role.Admin] },
      },
      {
        path: 'products',
        component: ProductsComponent,
        // data: { roles: [Role.Admin] },
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        data: { roles: [Role.Admin] },
      },
      {
        path: 'add-product/:id',
        component: AddProductComponent,
        data: { roles: [Role.Admin] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
