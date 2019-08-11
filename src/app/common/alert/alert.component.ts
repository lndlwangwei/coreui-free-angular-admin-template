import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  // templateUrl: './alert.component.html',
  template: '<div *ngFor="let alert of alerts" style="width:400px;position: absolute;margin: auto;left:40%">\n' +
  '            <alert [type]="alert.type" [dismissOnTimeout]="5000">{{ alert.msg }}</alert>\n' +
  '          </div>'
})
export class AlertComponent implements OnInit {

  public alerts = [];

  constructor() { }

  ngOnInit() {
    this.alerts.push({
      type: 'warning',
      msg: 'info msg asdfasdfasdfasdf asdfasdfasdf asdfasdfasdfa'
    }, 3000);
  }

}
