import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import {ApplicationRoutingModule} from './application-routing.module';
import {ApplicationService} from '../../common/service/application.service';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {BaseModule} from '../base/base.module';
import {MyCommonModule} from '../../common/my-common.module';



@NgModule({
  declarations: [ApplicationComponent, ApplicationEditComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BaseModule,
    MyCommonModule
  ],
  providers: [
    ApplicationService
  ],
  entryComponents: [
    ApplicationEditComponent
  ]
})
export class ApplicationModule { }
