import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss'],
})
export class DeletePopupComponent implements OnInit {
  @Input() text: string;
  @Input() left: any;
  @Input() top: any;
  @Input() dataId: any;
  @Output() deleteItem = new EventEmitter();
  @Output() cancelDelete = new EventEmitter();
  constructor(private service: SharedService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['left']) {
      console.log(this.left, 'll');
    }
  }
  closeDelete() {
    this.cancelDelete.emit();
  }
  deleteData() {
    this.deleteItem.emit(this.dataId);
    // this.service.deleteProduct(this.productId).subscribe({
    //   next: (success: any) => {
    //     console.log(success);
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   },
    // });
  }

  ngOnInit(): void {}
}
