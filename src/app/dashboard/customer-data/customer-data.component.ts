import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { Utils } from 'src/app/utils/utils';

import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GridComponent } from 'src/app/shared/components/grid/grid.component';
import { Subscription } from 'rxjs';
// import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss'],
})
export class CustomerDataComponent implements OnInit, OnDestroy {
  @ViewChild('gridComponent') grid: GridComponent = new GridComponent();
  subscription: Subscription[] = [];
  listData: any;
  listDataClone: any;
  date = false;
  calLeft = '';
  calTop = '';
  deleted = false;
  deleteSuccess: any;
  showPopupMessage: any;
  showPopup: boolean;
  popTop = '300';
  setDate = '';
  fromdateSelected = false;
  fromDate = '';
  toDate = '';
  todateSelected = false;
  showcal = false;
  showcalto = false;
  activeValue: any;
  dateModalHeight: any;
  dateModalWidth: any;
  showDateModal = false;
  calModalHeight: any;
  calModalWidth: any;
  showfilteringDate = false;
  from = '';
  to = '';
  constructor(private service: SharedService, private router: Router) {}

  // selectedDate: NgbDate;
  // constructor(private calendar: NgbCalendar, private formatter: NgbDateParserFormatter) {
  // }
  // this.selectedDate = NgbCalendar.getToday();
  // openCalendar(event: any) {
  //   this.date = true;
  //   this.calLeft = event.clientX;
  //   this.calTop = event.clientY;
  // }

  // hidecal() {
  //   this.date = false;
  // }
  geteditData(data: any) {
    this.router.navigate(['/dashboard/register-customer', data._id], {
      state: { customerData: data, redirectfromExecutive: true },
    });
  }
  // deleteSelectedItem(idValue: any) {
  //   console.log(idValue);
  //   this.service.setDeleteData(idValue).subscribe((data: any) => {
  //     if (data) {
  //       this.grid.closeDelete();
  //       this.getCustomerInfo();
  //     }
  //   });
  // }
  deleteSelectedItem(idValue: any) {
    console.log(idValue);
    this.subscription.push(
      this.service.setDeleteData(idValue).subscribe({
        next: (data: any) => {
          // this.showPopup = true;
          // setTimeout(() => {
          //   this.showPopup = false;
          // }, 3000);
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
          // this.showPopupMessage = data.message;
          this.grid.closeDelete();
          this.getCustomerInfo();
          console.log(this.grid);
        },
        error: (error: any) => {},
      })
    );
  }
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
      name: 'Email id',
      field: 'email',
      image: '../../../../assets/images/email.png',
      class: 'email-field',
    },
    {
      name: 'Product',
      productLoop: true,
      class: 'product-field',
      image: '../../../../assets/images/Product-list.png',
    },
  ];

  getCustomerInfo() {
    this.subscription.push(
      this.service.getCustomerData().subscribe((item: any) => {
        this.listData = item.data;
        console.log(this.listData, 'data');
        this.listDataClone = Utils.getClonedData(this.listData);
      })
    );
  }
  // datepicker
  getSelectedDate(date: any) {
    this.listData = this.listDataClone.filter(
      (obj: any) =>
        new Date(obj.createdAt).toDateString() == new Date(date).toDateString()
    );
    this.date = false;
  }
  calpos(event: any) {
    this.calModalHeight = event.clientY;
    this.calModalWidth = event.clientX;
  }
  showDateForm(event: any, value: string) {
    this.showDateModal = true;
    this.activeValue = value;
    this.dateModalHeight = event.pageY;
    this.dateModalWidth = event.clientX;
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

  getfromDate(data: any) {
    this.fromDate = data.dateFormat;
    console.log(this.fromDate);
    this.fromdateSelected = true;
    this.showcal = false;
  }
  getLastDate(data: any) {
    this.toDate = data.dateFormat;
    console.log(this.toDate);

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
  closeCalendar() {
    this.showcal = false;
  }
  openCalendar(event: any) {
    this.date = true;
    this.calTop = event.clientY;
    this.calLeft = event.clientX;
    console.log(event, 'event');
  }
  onDatesSelect(date: any) {
    this.fromDate = `${date.day}-${date.month}-${date.year}`;
    this.toDate = `${date.day}-${date.month}-${date.year}`;
    console.log(this.fromDate);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.getCustomerInfo();
  }
}
