import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';
import { GridComponent } from 'src/app/shared/components/grid/grid.component';
import { ProductAllocationComponent } from 'src/app/shared/components/product-allocation/product-allocation.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-edit-executive',
  templateUrl: './edit-executive.component.html',
  styleUrls: ['./edit-executive.component.scss'],
})
export class EditExecutiveComponent implements OnInit, OnDestroy {
  @ViewChild('gridComponent') grid: GridComponent = new GridComponent();
  @ViewChild('productAllocationComponent')
  productView: ProductAllocationComponent;
  subscription: Subscription[] = [];
  listData: any;
  listDataClone: any;
  calTop = '';
  calLeft = '';
  allocate = false;
  selectedUserid = '';
  deleteSuccess: any;
  deleted = false;
  selectedUser: string;
  addedProduct: any;
  showPopupMessage: any;
  showPopup = false;
  popTop = '200px';
  // date popup
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
  errorList = [];
  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private _change: ChangeDetectorRef
  ) {}
  date = false;
  allocatedMessage: any;
  allocPop = false;
  productMessage = false;
  tableColumn: any = [
    {
      name: 'Employee name',
      field: 'name',
      field2: 'createdAt',
      class: 'name-field',
    },
    {
      name: 'Employee ID',
      field: 'employId',
      label: 'Employee ID',
      class: 'emp-field',
    },

    {
      name: 'Phone number',
      field: 'phone',
      class: 'phone-field',
      image: '../../../../assets/images/call.png',
    },
    {
      name: 'Product allocation',
      eventButton: 'allocate',
      class: 'allocate-field',
    },
  ];
  getExecutive() {
    this.subscription.push(
      this.service.getExecutiveData().subscribe((executive: any) => {
        this.listData = executive.data;
        console.log(this.listData, 'data');
        this.listDataClone = Utils.getClonedData(this.listData);

        if (this.addedProduct) {
          this.showPopupMessage = 'Updated Successfully';
          this.showPopup = true;
          this._change.detectChanges();
          setTimeout(() => {
            this.showPopup = false;
          }, 3000);
        }
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
  editExecutive(data: any) {
    this.router.navigate(['/dashboard/add-executive', data._id], {
      state: { userData: data },
    });

    console.log(data, 'list');
  }

  deleteSelectItem(idValue: any) {
    console.log(idValue);
    this.subscription.push(
      this.service.setDeleteExecutiveData(idValue).subscribe({
        next: (data: any) => {
          // this.deleted = true;
          // setTimeout(() => {
          //   this.deleted = false;
          // }, 3000);
          this.service.setPopups({
            status: true,
            // right: '50%',
            // bottom: '28%',
            message: 'Deleted successfully',
          });
          setTimeout(() => {
            this.service.setPopups({
              status: false,
            });
          }, 3000);
          // this.deleteSuccess = data.message;
          this.grid.closeDelete();
          this.getExecutive();
          console.log(this.grid);
        },
        error: (error: any) => {},
      })
    );
  }

  opallocate() {}

  // allocate modal
  showAllocate(event: any) {
    this.allocate = true;
    this.selectedUserid = event._id;
    this.selectedUser = event.name;
  }
  hideAllocate() {
    this.allocate = false;
  }
  allocateProduct(productData: any) {
    this.subscription.push(
      this.service.allocateProduct(this.selectedUserid, productData).subscribe({
        next: (data: any) => {
          if (data.success && data.message[0].status === 304) {
            this.errorList = data.message;
            this.productMessage = true;
            this._change.detectChanges();
          } else if (data.success) {
            this.productMessage = false;
            this.allocate = false;
            this.productView.reset();
            this.service.setPopups({
              status: true,
              // right: '50%',
              // bottom: '45.5%',
              message: `Product allocated to ${this.selectedUser}`,
            });
            setTimeout(() => {
              this.service.setPopups({
                status: false,
              });
            }, 3000);
            this.getExecutive();
          }
        },
        error: (error: any) => {
          this.errorList = error.error.error.response.message;
        },
      })
    );
    this.allocate = true;
    // );
  }
  // date popup
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
  // applyFilter() {
  //   this.listData = this.listDataClone.filter(
  //     (obj: any) =>
  //       new Date(new Date(obj.createdAt).toDateString()).getTime() >=
  //         new Date(new Date(this.fromDate).toDateString()).getTime() &&
  //       new Date(new Date(obj.createdAt).toDateString()).getTime() <=
  //         new Date(new Date(this.toDate).toDateString()).getTime()
  //   );
  //   this.date = false;
  //   this.showDateModal = false;
  //   console.log(this.fromDate, this.toDate);
  // }
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
    this.getExecutive();
    this.subscription.push(
      this.route.params.subscribe((data) => {
        this.addedProduct = history.state.redirectfromAdd;
      })
    );
  }
}
