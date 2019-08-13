import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from './alert/alert.component';
import {AlertModule} from 'ngx-bootstrap';
import {ZtreeComponent} from './ztree/ztree.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AlertComponent, ZtreeComponent],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot()
  ],
  exports: [AlertComponent, ZtreeComponent],
})
export class MyCommonModule { }
