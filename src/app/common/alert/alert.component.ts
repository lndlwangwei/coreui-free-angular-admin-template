import { Component, OnInit } from '@angular/core';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
  // template: '<div *ngFor="let alert of alerts">\n' +
  // '            <alert [type]="alert.type" [dismissOnTimeout]="5000">{{ alert.msg }}</alert>\n' +
  // '          </div>'
})
export class AlertComponent implements OnInit {

  alerts = [];

  constructor(public alertService: AlertService) { }

  ngOnInit() {
    this.alertService.valueUpdated.subscribe((value => {
      this.alerts = this.alertService.alerts;
    }));
  }

}
