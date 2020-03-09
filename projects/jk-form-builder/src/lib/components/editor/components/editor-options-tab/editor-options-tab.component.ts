import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ng-jk-editor-options-tab',
  templateUrl: './editor-options-tab.component.html',
  styleUrls: ['./editor-options-tab.component.scss']
})
export class EditorOptionsTabComponent implements OnInit {

  @Input() form: FormArray;
  id = '';
  label = '';
  fieldType: string;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.fieldType = this.form.parent.value.main.type;
  }

  add() {
    if ((this.id.length > 0 && this.label.length > 0) || this.fieldType === 'select') {
      const group = new FormGroup({
        id: new FormControl(this.id),
        label: new FormControl(this.label)
      });
      this.form.push(group);
      this.appendDefaultValueControl();
      this.id = '';
      this.label = '';
    }
  }

  private appendDefaultValueControl() {
    if (this.form.parent.value.main.type === 'checkboxes') {
      (this.form.parent.get('main').get('defaultValue') as FormGroup).addControl(this.id, new FormControl(false));
    }
  }

  remove(index) {
    this.form.removeAt(index);
  }

}
