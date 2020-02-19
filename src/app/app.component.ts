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
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'formx__row',
      fieldGroup: [
        {
          key: 'middlename',
          type: 'select',
          className: 'formx__column formx__column--w6',
          templateOptions: {
            label: 'Middle Name',
            options: [
              { id: '1', label: 'Soccer' },
              { id: '2', label: 'Basketball' },
              { id: '3', label: 'Taekwondo' },
            ],
          }
        },
        {
          key: 'lastname',
          type: 'input-text',
          className: 'formx__column formx__column--w6',
          templateOptions: {
            label: 'Last Name'
          }
        },
      ],
    },

    {
      fieldGroupClassName: 'formx__row',
      fieldGroup: [
        {
            key: 'address',
            type: 'input-text',
            className: 'formx__column formx__column--horizontal',
            templateOptions: {
              label: 'Address',
              required: true
            }
        },
        {
          key: 'province',
          type: 'input-text',
          className: 'formx__column ',
          templateOptions: {
            label: 'Province'
          }
        },
      ],
    },
  ];

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
}
