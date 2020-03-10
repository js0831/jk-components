import { Component, OnInit } from '@angular/core';
import { JkWaitService } from 'projects/jk-wait/src/public-api';
import { JkAlertService } from 'projects/jk-alert/src/public-api';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { PrompType } from 'projects/jk-alert/src/lib/components/prompt/prompt-type.enum';
import { JkFormBuilderConfig } from 'projects/jk-form-builder/src/lib/interface/jk-form-builder-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formBuilderConfig: JkFormBuilderConfig = {
    model: {},
    form: new FormGroup({}),
    fields: [],
    options: {}
  };

  customFormBuilderConfig: JkFormBuilderConfig = {
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

    setTimeout( x => {
      this.formBuilderConfig.fields = [{"fieldGroupClassName":"form-row","fieldGroup":[{"type":"formly-group","className":"form-group col-md-12","id":"formly_4_blank__0","hooks":{},"modelOptions":{},"templateOptions":{"label":"Details","placeholder":"","disabled":false},"wrappers":["form-group"],"key":"details","defaultValue":{},"fieldGroup":[{"fieldGroupClassName":"form-row","fieldGroup":[{"type":"input","className":"form-group col-md-4","id":"formly_17_blank__0","hooks":{},"modelOptions":{},"templateOptions":{"label":"Name","required":true,"minLength":null,"maxLength":null,"max":null,"min":null,"type":"text","placeholder":"","disabled":false},"wrappers":[],"key":"name","defaultValue":"",},{"type":"textarea","className":"form-group col-md-8","id":"formly_17_blank__1","hooks":{},"modelOptions":{},"templateOptions":{"label":"Description","required":null,"minLength":null,"maxLength":null,"max":null,"min":null,"placeholder":"","disabled":false},"wrappers":[],"key":"description","defaultValue":"",}],"id":"formly_14___0","hooks":{},"modelOptions":{},"templateOptions":{},"type":"formly-group","defaultValue":{},"wrappers":[]}],}],"id":"formly_1___0","hooks":{},"modelOptions":{},"templateOptions":{},"type":"formly-group","defaultValue":{},"wrappers":[]}];
    }, 1000);
  }

  onsuccess(e) {
    console.log(e);
  }
  // FORMLY BUILDER
  // onSave(data) {
  //   console.log(JSON.stringify(data));
  // }
}
