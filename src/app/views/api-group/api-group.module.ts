import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiGroupComponent } from './api-group.component';
import {ApiGroupRoutingModule} from './api-group-routing.module';
import { ApiGroupEditComponent } from './api-group-edit/api-group-edit.component';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {BaseModule} from '../base/base.module';
import {MyCommonModule} from '../../common/my-common.module';
import { PermissionManageComponent } from './permission-manage/permission-manage.component';
import {ApiService} from '../../common/service/api.service';
import {FormsModule} from '@angular/forms';
import {ApiGroupService} from '../../common/service/api-group.service';



@NgModule({
  declarations: [ApiGroupComponent, ApiGroupEditComponent, PermissionManageComponent],
  imports: [
    CommonModule,
    ApiGroupRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BaseModule,
    MyCommonModule,
    FormsModule
  ],
  providers: [
    ApiGroupService, ApiService
  ],
  entryComponents: [
    ApiGroupEditComponent, PermissionManageComponent
  ]
})
export class ApiGroupModule { }
