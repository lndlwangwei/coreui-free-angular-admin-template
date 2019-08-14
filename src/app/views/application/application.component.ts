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

  public appModalRef: BsModalRef;
  public permissionModalRef: BsModalRef;
  public applications = [];


  constructor(public applicationService: ApplicationService,
              public modalService: BsModalService,
              public alertService: AlertService) { }

  ngOnInit() {
    this.getApplication();
    this.modalService.onHidden.subscribe(r => {
      if (this.appModalRef.content.isConfirmed) {
        // todo
        this.getApplication();
      }
    });
  }

  getApplication() {
    this.applicationService.getAll().subscribe(response => {
      this.applications = response;
    });
  }

  openEditModal(application?) {
    this.appModalRef = this.modalService.show(ApplicationEditComponent, {
      backdrop: 'static',
      initialState: {application: application || {}}
    });

    this.modalService.onHidden.subscribe(r => {
      if (this.appModalRef.content.isConfirmed) {
        // todo
        this.getApplication();
      }
    });
  }

  openManagePermissionWindow(application) {
    this.permissionModalRef = this.modalService.show(PermissionManageComponent, {
      backdrop: 'static', class: 'modal-xl',
      initialState: {application: application}
    });
  }

  delete(appId) {
    this.applicationService.delete(appId).subscribe(response => {
      this.alertService.alertInfo('删除成功');
      this.getApplication();
    });
  }
}
