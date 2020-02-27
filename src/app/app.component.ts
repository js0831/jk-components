import { Component, OnInit } from '@angular/core';
import { JkWaitService } from 'projects/jk-wait/src/public-api';
import { JkAlertService } from 'projects/jk-alert/src/public-api';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // FORMLY BUILDER
  // isEdit = true;
  // title = 'jk-components';
  // form = new FormGroup({});
  // model: any = {};
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[] = [];

  constructor(
    private wait: JkWaitService,
    private sv: JkAlertService
  ) {
  }

  ngOnInit() {
    setTimeout( x => {
      this.wait.start({
        type: 'TEXT_SPINNER',
        text: 'Hello'
      });
    });

    setTimeout( x => {
      this.wait.end();
    }, 3000);

    setTimeout( x => {
      setTimeout( x => {
        this.wait.start();
      });

      setTimeout( x => {
        this.wait.end();
      }, 3000);
    }, 5000);

  }

  // FORMLY BUILDER
  // onSave(data) {
  //   console.log(JSON.stringify(data));
  // }
}
