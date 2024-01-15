import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
})
export class PopupMessageComponent implements OnInit {
  // @Input() showPopupMessage: string;
  // @Input() popTop: any;
  showPopup: boolean;
  showPopupMessage: string;
  popRight: any;
  popTop: any;
  popBottom: any;
  popClass: any;
  constructor(private _service: SharedService) {}

  ngOnInit(): void {
    this._service.getPopup().subscribe((data: any) => {
      this.showPopup = data.status;
      this.showPopupMessage = data.message;
      this.popRight = data.right;
      this.popTop = data.top;
      this.popBottom = data.bottom;
      this.popClass = data.class;
    });
  }
}
