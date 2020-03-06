import { Component, OnInit } from '@angular/core';
import { JkWaitService } from 'projects/jk-wait/src/public-api';
import { JkAlertService } from 'projects/jk-alert/src/public-api';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { PrompType } from 'projects/jk-alert/src/lib/components/prompt/prompt-type.enum';
import { FormBuilderConfig } from 'projects/form-builder/src/lib/interface/form-builder-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formBuilderConfig: FormBuilderConfig = {
    model: {},
    form: new FormGroup({}),
    fields: [],
    options: {}
  };

  formsList = [{name: 'Name A', id: '5e609dccc97b160017499b85'}, {name: 'Name B', id: 'B123'}];

  save(e) {
    console.log(e);
  }
  // FORMLY BUILDER
  // isEdit = true;
  // title = 'jk-components';
  // form = new FormGroup({});
  // model: any = {};
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[] = [];
  // data = {
  //   value: 'B',
  //   options: [
  //     {
  //       label: 'OPTION A',
  //       value: 'A'
  //     },
  //     {
  //       label: 'OPTION B',
  //       value: 'B'
  //     },
  //     {
  //       label: 'OPTION C',
  //       value: 'C'
  //     }
  //   ]
  // };

  constructor(
    // private wait: JkWaitService,
    // private sv: JkAlertService
  ) {
    //
  }

  ngOnInit() {

    // setTimeout( x => {
    //   this.sv.prompt({
    //     type: PrompType.TEXT,
    //     data: this.data
    //   }, 'TITLE', 'MESSAGE').then( (xy: any) => {
    //     alert(xy.value);
    //   });
    // });
  }

  onsuccess(e) {
    console.log(e);
  }
  // FORMLY BUILDER
  // onSave(data) {
  //   console.log(JSON.stringify(data));
  // }
}
