import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ApplicationService} from '../../../common/service/application.service';
import {AlertService} from '../../../common/alert/alert.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html'
})
export class ApplicationEditComponent implements OnInit {

  public application: any;
  public isConfirmed = false;

  constructor(public modalRef: BsModalRef,
              public alertService: AlertService,
              public applicationService: ApplicationService) { }

  ngOnInit() {
  }

  public save() {
    this.applicationService.save(this.application).subscribe(response => {
      this.alertService.alertInfo('保存成功');
      this.isConfirmed = true;
      this.modalRef.hide();
    });
  }
}
