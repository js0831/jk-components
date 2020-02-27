import { NgModule } from '@angular/core';
import { JkAlertComponent } from './jk-alert.component';
import { CommonModule } from '@angular/common';
import { PromptComponent } from './components/prompt/prompt.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [JkAlertComponent, PromptComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [JkAlertComponent]
})
export class JkAlertModule { }
