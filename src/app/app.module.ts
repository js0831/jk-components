import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JkWaitModule } from 'projects/jk-wait/src/public-api';
import { WaitConfig } from 'projects/jk-wait/src/lib/config/wait.config';
import { JkAlertModule } from 'projects/jk-alert/src/public-api';

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
    AppRoutingModule,
    JkWaitModule.forRoot(waitConfig),
    JkAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
