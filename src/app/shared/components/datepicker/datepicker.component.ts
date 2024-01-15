import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  selectedDate = '';
  monthFormat = '';

  constructor() {}
  @Output() selDate = new EventEmitter();
  @Output() selDateMonth = new EventEmitter();
  @Output() cancelcal = new EventEmitter();
  @Input() calLeft: any;
  @Input() calTop: any;
  @Input() calendarClose: any;
  date = false;
  // openCalendar() {
  //   this.date = true;
  // }
  closeCalendar() {
    this.cancelcal.emit();
  }
  onDateSelect(date: any) {
    this.selectedDate = `${date.month}-${date.day}-${date.year}`;
    this.monthFormat = `${date.day}-${date.month}-${date.year}`;
  }
  selectDte() {
    this.selDate.emit(this.selectedDate);
    this.selDateMonth.emit({
      monthFormat: this.monthFormat,
      dateFormat: this.selectedDate,
    });
    this.date = false;
  }
  ngOnInit(): void {}
}
