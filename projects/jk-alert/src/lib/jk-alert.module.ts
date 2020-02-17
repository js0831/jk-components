import { NgModule } from '@angular/core';
import { JkAlertComponent } from './jk-alert.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [JkAlertComponent],
  imports: [
    CommonModule
  ],
  exports: [JkAlertComponent]
})
export class JkAlertModule { }
