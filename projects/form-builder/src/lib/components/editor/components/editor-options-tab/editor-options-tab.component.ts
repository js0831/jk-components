import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'jk-editor-options-tab',
  templateUrl: './editor-options-tab.component.html',
  styleUrls: ['./editor-options-tab.component.scss']
})
export class EditorOptionsTabComponent implements OnInit {

  @Input() form: FormArray;
  id = '';
  label = '';

  // constructor() { }

  ngOnInit() {
    //
  }

  add() {
    if (this.id.length > 0 && this.label.length > 0) {
      const group = new FormGroup({
        id: new FormControl(this.id),
        label: new FormControl(this.label)
      });
      this.form.push(group);
      this.id = '';
      this.label = '';
    }
  }

  remove(index) {
    this.form.removeAt(index);
  }

}
