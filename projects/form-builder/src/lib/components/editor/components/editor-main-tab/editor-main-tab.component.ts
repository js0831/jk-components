import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'jk-editor-main-tab',
  templateUrl: './editor-main-tab.component.html',
  styleUrls: ['./editor-main-tab.component.scss']
})
export class EditorMainTabComponent implements OnInit {

  @Input() form: FormGroup;

  inputTypes = [
    {
      label: 'Blank',
      value: 'blank'
    },
    {
      label: 'Input Text',
      value: 'input-text'
    },
    {
      label: 'Input Password',
      value: 'input-password'
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
      label: 'Input Range',
      value: 'input-range'
    },
    {
      label: 'Input Number',
      value: 'input-number'
    },
    {
      label: 'Input Email',
      value: 'input-email'
    },
    {
      label: 'Textarea',
      value: 'textarea'
    },
    {
      label: 'Select',
      value: 'select'
    },
    {
      label: 'Radio',
      value: 'radio'
    },
    {
      label: 'Checkbox',
      value: 'checkbox'
    },
    {
      label: 'Checkbox (Multiple)',
      value: 'textarea'
    }
  ];

  // constructor() {}

  ngOnInit() {
    //
  }

}
