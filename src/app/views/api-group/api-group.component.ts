import { Component, OnInit } from '@angular/core';
import {ApiGroupService} from '../../common/service/api-group.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ApiGroupEditComponent} from './api-group-edit/api-group-edit.component';
import {AlertService} from '../../common/alert/alert.service';
import {PermissionManageComponent} from './permission-manage/permission-manage.component';

@Component({
  selector: 'app-api-group',
  templateUrl: './api-group.component.html'
})
export class ApiGroupComponent implements OnInit {

  public appModalRef: BsModalRef;
  public permissionModalRef: BsModalRef;
  public apiGroups = [];


  constructor(public apiGroupService: ApiGroupService,
              public modalService: BsModalService,
              public alertService: AlertService) { }

  ngOnInit() {
    this.getApiGroup();
    this.modalService.onHidden.subscribe(r => {
      if (this.appModalRef.content.isConfirmed) {
        // todo
        this.getApiGroup();
      }
    });
  }

  getApiGroup() {
    this.apiGroupService.getAll().subscribe(response => {
      this.apiGroups = response;
    });
  }

  openEditModal(apiGroup?) {
    this.appModalRef = this.modalService.show(ApiGroupEditComponent, {
      backdrop: 'static',
      initialState: {apiGroup: apiGroup || {}}
    });

    this.modalService.onHidden.subscribe(r => {
      if (this.appModalRef.content.isConfirmed) {
        // todo
        this.getApiGroup();
      }
    });
  }

  openManagePermissionWindow(apiGroup) {
    this.permissionModalRef = this.modalService.show(PermissionManageComponent, {
      backdrop: 'static', class: 'modal-xl',
      initialState: {apiGroup: apiGroup}
    });
  }

  delete(appId) {
    this.apiGroupService.delete(appId).subscribe(response => {
      this.alertService.alertInfo('删除成功');
      this.getApiGroup();
    });
  }
}
