import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from './alert/alert.component';
import {AlertModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [AlertComponent]
})
export class MyCommonModule { }
