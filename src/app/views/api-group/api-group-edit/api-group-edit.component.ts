import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ApiGroupService} from '../../../common/service/api-group.service';
import {AlertService} from '../../../common/alert/alert.service';

@Component({
  selector: 'app-api-group-edit',
  templateUrl: './api-group-edit.component.html'
})
export class ApiGroupEditComponent implements OnInit {

  public apiGroup: any;
  public isConfirmed = false;

  constructor(public modalRef: BsModalRef,
              public alertService: AlertService,
              public apiGroupService: ApiGroupService) { }

  ngOnInit() {
  }

  public save() {
    this.apiGroupService.save(this.apiGroup).subscribe(response => {
      this.alertService.alertInfo('保存成功');
      this.isConfirmed = true;
      this.modalRef.hide();
    });
  }
}
