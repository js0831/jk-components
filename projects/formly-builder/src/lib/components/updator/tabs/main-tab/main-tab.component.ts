import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'jk-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css']
})
export class MainTabComponent implements OnInit {

  @Input() form: FormGroup;
  fieldsWithPlaceholder = [
    'input-text',
    'input-password',
    'input-date',
    'input-time',
    'input-textarea',
    'input-date',
    'input-number',
    'input-email',
  ];

  inputTypeOptions = [
    {
      label: 'Empty',
      value: 'empty'
    },
    {
      label: 'Input Text',
      value: 'input-text'
    },
    {
      label: 'Input Date',
      value: 'input-date'
    },
    {
      label: 'Input Time',
      value: 'input-time'
    },
    {
      label: 'Input Email',
      value: 'input-email'
    },
    {
      label: 'Input Number',
      value: 'input-number'
    },
    {
      label: 'Input Password',
      value: 'input-password'
    },
    {
      label: 'Select',
      value: 'select'
    },
    {
      label: 'Textarea',
      value: 'input-textarea'
    },
    {
      label: 'Input Radio',
      value: 'input-radio'
    },
    {
      label: 'Input Checkbox',
      value: 'input-checkbox'
    },
    {
      label: 'Input Checkbox ( Multiple )',
      value: 'input-checkbox-multiple'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  withPlaceholder() {
    return this.fieldsWithPlaceholder.indexOf(this.form.get('type').value) >= 0;
  }
}
