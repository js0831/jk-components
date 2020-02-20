import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'jk-options-tab',
  templateUrl: './options-tab.component.html',
  styleUrls: ['./options-tab.component.scss']
})
export class OptionsTabComponent implements OnInit {

  @Input() form: FormArray;

  constructor() { }

  ngOnInit() {
    if (this.form.value.length === 0) {
      this.addOption();
    }
  }

  addOption() {
    const group = new FormGroup({
      id: new FormControl(''),
      label: new FormControl('')
    });
    this.form.push(group);
  }

  deleteOption(index) {
    this.form.removeAt(index);
  }
}
