import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../common/service/application.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ApplicationEditComponent} from './application-edit/application-edit.component';
import {AlertService} from '../../common/alert/alert.service';
import {PermissionManageComponent} from './permission-manage/permission-manage.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {

  public modalRef: BsModalRef;
  public applications = [];


  constructor(public applicationService: ApplicationService,
              public modalService: BsModalService) { }

  ngOnInit() {
    this.getApplication();
  }

  getApplication() {
    this.applicationService.getAll().subscribe(response => {
      this.applications = response;
    });
  }

  openModal(application) {
    this.modalRef = this.modalService.show(ApplicationEditComponent, {
      backdrop: 'static',
      initialState: {application: application}
    });
    this.modalService.onHidden.subscribe(r => {
      if (this.modalRef.content.isCancel) {
        console.log('取消了' + this.modalRef.content.value);
      } else {
        console.log('确定了' + this.modalRef.content.value);
      }
    });
  }

  managePermission() {
    this.modalService.show(PermissionManageComponent, {backdrop: 'static', class: 'modal-xl'});
  }
}
