import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import {ApplicationRoutingModule} from './application-routing.module';
import {ApplicationService} from '../../common/service/application.service';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {BaseModule} from '../base/base.module';
import {MyCommonModule} from '../../common/my-common.module';
import {AlertService} from '../../common/alert/alert.service';
import { PermissionManageComponent } from './permission-manage/permission-manage.component';
import {ApiService} from '../../common/service/api.service';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ApplicationComponent, ApplicationEditComponent, PermissionManageComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BaseModule,
    MyCommonModule,
    FormsModule
  ],
  providers: [
    ApplicationService, ApiService
  ],
  entryComponents: [
    ApplicationEditComponent, PermissionManageComponent
  ]
})
export class ApplicationModule { }
