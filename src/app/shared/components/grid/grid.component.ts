import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  deleteOpen = false;
  modalheight: any;
  modalwidth: any;
  deleteId: any;
  lastItem = false;
  page: number = 1;
  totalData: any;
  pagesize: number = 6;
  constructor() {}
  @Input() tableColumn: any;
  @Input() title: string;
  @Input() listData: any;
  @Output() editData = new EventEmitter();
  @Output() deleteitem = new EventEmitter();
  @Output() eventOpen = new EventEmitter();

  editform(data: any) {
    this.editData.emit(data);
  }
  deleteData() {
    this.deleteitem.emit(this.deleteId);
  }
  showDelete(event: any, id: any, last: boolean) {
    this.deleteOpen = true;
    console.log(event, 'event');
    this.modalheight = event.clientY;
    this.modalwidth = event.clientX;
    this.deleteId = id;
    this.lastItem = last;
  }
  closeDelete() {
    this.deleteOpen = false;
  }
  showEvent(data: any) {
    this.eventOpen.emit(data);
  }
  ngOnInit(): void {
    console.log(this.listData, 'listdata');
    // this.totalData = this.listData.data.length;
  }
}
