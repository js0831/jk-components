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
import { IloginButtonModule } from 'projects/ilogin-button/src/public-api';

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
    FormlyBuilderModule,
    IloginButtonModule.forRoot({
      appId: '5e15a157522bc3d4a4a0329b'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
