import { Component } from '@angular/core';
import { JkWaitService } from 'projects/jk-wait/src/public-api';
import { JkAlertService } from 'projects/jk-alert/src/public-api';
import { AlertType } from 'projects/jk-alert/src/lib/alert.interface';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jk-components';

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private wait: JkWaitService,
    private sv: JkAlertService
  ) {
    // setTimeout( x => {
    //   this.wait.start();
    // }, 500);

    // setTimeout( x => {
    //   this.wait.end();
    // }, 2000);

    // setTimeout( x => {
    //   this.sv.alert({
    //     type: AlertType.CONFIRM,
    //     message: 'The quick',
    //     title: 'Test',
    //     buttons: ['Yes', 'No']
    //   }).then( y => {
    //     alert(y);
    //   });
    // }, 100);
  }

  onSave(data) {
    console.log(JSON.stringify(data));
  }
}
