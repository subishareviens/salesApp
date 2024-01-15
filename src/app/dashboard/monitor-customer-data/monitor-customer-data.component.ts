import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { GridComponent } from 'src/app/shared/components/grid/grid.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-monitor-customer-data',
  templateUrl: './monitor-customer-data.component.html',
  styleUrls: ['./monitor-customer-data.component.scss'],
})
export class MonitorCustomerDataComponent implements OnInit, OnDestroy {
  @ViewChild('gridComponent') grid: GridComponent = new GridComponent();
  @ViewChild('datepickerComponent') datepick: DatepickerComponent =
    new DatepickerComponent();
  subscription: Subscription[] = [];
  listData: any;
  listDataClone: any;
  dateModalHeight: any;
  dateModalWidth: any;
  showDateModal = false;
  calModalHeight: any;
  calModalWidth: any;
  showcal = false;
  showcalto = false;
  setDate = '';
  fromdateSelected = false;
  fromDate = '';
  from = '';
  to = '';
  toDate = '';
  todateSelected = false;
  calLeft = '';
  calTop = '';
  date = false;
  monthToFormat = '';
  monthFromFormat = '';
  deleteSuccess: any;
  deleted = false;
  activeValue = '';
  showfilteringDate = false;
  constructor(private service: SharedService, private router: Router) {}

  tableColumn: any = [
    {
      name: 'Customer name',
      field: 'name',
      field2: 'createdAt',
      class: 'name-field',
    },
    {
      name: 'Address',
      field: 'address1',
      field3: 'address2',
      class: 'address-field',
    },
    { name: 'Pincode', field: 'pin', class: 'pincode-field' },
    {
      name: 'Phone  number',
      field: 'phone',
      image: '../../../../assets/images/call.png',
      class: 'phone-field',
    },
    {
      name: 'Email id',
      field: 'email',
      image: '../../../../assets/images/email.png',
      class: 'email-field',
    },
    {
      name: 'Product',
      productLoop: true,
      image: '../../../../assets/images/Product-list.png',
      class: 'product-field',
    },
    {
      name: 'Empoyee ID',
      field: 'employId',
      label: 'Employee ID',
      class: 'emp-field',
    },
  ];

  getCustomerInfo() {
    this.subscription.push(
      this.service.getCustomerData().subscribe((data: any) => {
        this.listData = data.data;
        console.log(this.listData, 'data');
        this.listDataClone = Utils.getClonedData(this.listData);
      })
    );
  }
  geteditData(data: any) {
    console.log(data, 'gg');
    this.router.navigate(['/dashboard/register-customer', data._id], {
      state: { customerData: data, redirectfromAdmin: true },
    });
  }
  // getCustomerData() {
  //   let customerData = this.customer.value;
  //   this.service.saveCustomerData(customerData).subscribe((data: any) => {
  //     console.log(data, 'kkk');
  //   });
  // }
  deleteSelectedItem(idValue: any) {
    console.log(idValue);
    this.subscription.push(
      this.service.setDeleteData(idValue).subscribe({
        next: (data: any) => {
          this.service.setPopups({
            status: true,
            // right: '50%',
            // bottom: '28%',
            message: 'Customer deleted  successfully',
          });
          setTimeout(() => {
            this.service.setPopups({
              status: false,
            });
          }, 3000);
          this.grid.closeDelete();
          this.getCustomerInfo();
          console.log(this.grid);
        },
        error: (error: any) => {},
      })
    );
  }
  getSelectedDate(date: any) {
    this.listData = this.listDataClone.filter(
      (obj: any) =>
        new Date(obj.createdAt).toDateString() == new Date(date).toDateString()
    );
    this.date = false;
  }

  // download with date
  showDateForm(event: any, value: string) {
    console.log(event, 'ee');
    this.activeValue = value;
    this.dateModalHeight = event.pageY;
    this.dateModalWidth = event.clientX;
    this.showDateModal = true;
    if (this.showfilteringDate) {
      this.showDateModal = false;
    }
  }
  applyFilter() {
    this.listData = this.listDataClone.filter(
      (obj: any) =>
        new Date(new Date(obj.createdAt).toDateString()).getTime() >=
          new Date(new Date(this.fromDate).toDateString()).getTime() &&
        new Date(new Date(obj.createdAt).toDateString()).getTime() <=
          new Date(new Date(this.toDate).toDateString()).getTime()
    );
    this.showfilteringDate = true;
    this.date = false;
    this.showDateModal = false;
    this.from = this.fromDate;
    this.to = this.toDate;
    this.todateSelected = false;
    this.fromdateSelected = false;
    this.fromDate = '';
    this.toDate = '';
  }
  clearFilter() {
    this.listData = this.listDataClone;
    this.activeValue = '';
    this.showfilteringDate = false;
  }
  calpos(event: any) {
    this.calModalHeight = event.clientY;
    this.calModalWidth = event.clientX;
  }
  getfromDate(data: any) {
    this.fromDate = data.dateFormat;
    this.monthFromFormat = data.monthFormat;
    this.fromdateSelected = true;
    this.showcal = false;
  }
  getLastDate(data: any) {
    this.toDate = data.dateFormat;
    this.monthToFormat = data.monthFormat;
    this.todateSelected = true;
    this.showcalto = false;
  }
  getDate() {
    this.showcal = true;
  }
  getToDate() {
    this.showcalto = true;
  }
  closeCal() {
    this.showDateModal = false;
    this.todateSelected = false;
    this.fromdateSelected = false;
    this.fromDate = '';
    this.toDate = '';
  }
  closeCalendar() {
    this.showcal = false;
  }
  openCalendar(event: any) {
    this.date = true;
    this.calTop = event.clientY;
    this.calLeft = event.clientX;
    console.log(event, 'event');
  }
  hidecal() {
    console.log('ddd');
    this.date = false;
    this.showcal = false;
    this.showcalto = false;
  }
  selectDte() {
    this.fromdateSelected = true;
    this.showcal = false;
    // this.todateSelected = true;
  }
  downloadData() {
    this.subscription.push(
      this.service
        .downloadCustomerData(this.monthFromFormat, this.monthToFormat)
        .subscribe((data: any) => {
          const blob = new Blob([data], { type: data.type });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        })
    );
    this.showDateModal = false;
    this.todateSelected = false;
    this.fromdateSelected = false;
    this.fromDate = '';
    this.toDate = '';
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.getCustomerInfo();
  }
}
