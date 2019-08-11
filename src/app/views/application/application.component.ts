import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../common/service/application.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ApplicationEditComponent} from './application-edit/application-edit.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

  public modalRef: BsModalRef;

  alertsDismiss: any = [];

  constructor(public applicationService: ApplicationService, public modalService: BsModalService) { }

  ngOnInit() {
    this.applicationService.getAll().subscribe(response => {});
  }

  openModal() {
    this.modalRef = this.modalService.show(ApplicationEditComponent, {backdrop: 'static'});
    this.modalService.onHidden.subscribe(r => {
      if (this.modalRef.content.isCancel) {
        console.log('取消了' + this.modalRef.content.value);
      } else {
        console.log('确定了' + this.modalRef.content.value);
      }
    });
  }

  add(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }
}
