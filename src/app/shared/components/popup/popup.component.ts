import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  showPopups: boolean;
  showPopupMsg: string;
  constructor(private _service: SharedService) {}

  ngOnInit(): void {
    this._service.getPopups().subscribe((data: any) => {
      this.showPopups = data.status;
      this.showPopupMsg = data.message;
    });
  }
}
