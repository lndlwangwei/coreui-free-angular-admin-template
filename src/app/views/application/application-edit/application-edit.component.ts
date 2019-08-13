import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ApplicationService} from '../../../common/service/application.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html'
})
export class ApplicationEditComponent implements OnInit {

  public application: any;

  constructor(public modalRef: BsModalRef,
              public applicationService: ApplicationService) { }

  ngOnInit() {
  }

  public add(application) {
    this.applicationService.add(application)
  }

  public update(application) {

  }
}
