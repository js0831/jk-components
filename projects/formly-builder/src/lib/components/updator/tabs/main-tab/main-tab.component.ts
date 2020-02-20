import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'jk-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.css']
})
export class MainTabComponent implements OnInit {

  @Input() form: FormGroup;

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
      label: 'Select',
      value: 'select'
    },
    {
      label: 'Textarea',
      value: 'input-textarea'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
