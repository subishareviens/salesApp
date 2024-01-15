import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './components/grid/grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from '../utils/pagination/pagination.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { SharedService } from '../service/shared.service';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { PopupMessageComponent } from './components/popup-message/popup-message.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductAllocationComponent } from './components/product-allocation/product-allocation.component';
import { PopupComponent } from './components/popup/popup.component';
import { InnerpageTitleComponent } from './components/innerpage-title/innerpage-title.component';

@NgModule({
  declarations: [
    GridComponent,
    PaginationComponent,
    DatepickerComponent,
    ConfirmComponent,
    DeletePopupComponent,
    InnerpageTitleComponent,
    // PopupComponent,
    // PopupMessageComponent,
    // ProductAllocationComponent,
  ],
  imports: [CommonModule, NgbModule, NgxPaginationModule],
  exports: [
    GridComponent,
    DatepickerComponent,
    ConfirmComponent,
    DeletePopupComponent,
    InnerpageTitleComponent
    // PopupComponent,
    // PopupMessageComponent,
  ],
})
export class SharedModule {}
