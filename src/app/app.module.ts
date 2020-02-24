import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JkWaitModule } from 'projects/jk-wait/src/public-api';
import { WaitConfig } from 'projects/jk-wait/src/lib/config/wait.config';
import { JkAlertModule } from 'projects/jk-alert/src/public-api';
import { FormlyBuilderModule } from 'projects/formly-builder/src/public-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const waitConfig: WaitConfig = {
  type: 'SPINNER',
  text: 'Loading...'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    JkWaitModule.forRoot(waitConfig),
    JkAlertModule,
    FormlyBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
