import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alerts = [];

  public valueUpdated: Subject<any> = new Subject<any>();

  constructor() {
    // const alert1 = {type: 'danger', msg: 'alert danger'};
    // const alert2 = {type: 'warning', msg: 'alert warning'};
    // this.alerts.push(alert1);
    // this.alerts.push(alert1);
    // setTimeout(() => {
    //   const index = this.alerts.indexOf(alert1);
    //   if (index > -1) {
    //     this.alerts.splice(index, 1);
    //   }
    // }, 5000);
    //
    // setTimeout(() => {
    //   this.alerts.push(alert2);
    // }, 5000);

  }

  public alertInfo(msg: string) {
    this.alert('info', msg);
  }

  public alertWarn(msg: string) {
    this.alert('warning', msg);
  }

  public alertError(msg: string) {
    this.alert('danger', msg);
  }

  private alert(type, msg) {
    const alertObject = {type: type, msg: msg};
    this.alerts.push(alertObject);
    this.valueUpdated.next(this.alerts);

    setTimeout(() => {
      const index = this.alerts.indexOf(alertObject);
      if (index > -1) {
        this.alerts.splice(index, 1);
      }

      this.valueUpdated.next(this.alerts);
    }, 5000);
  }
}
