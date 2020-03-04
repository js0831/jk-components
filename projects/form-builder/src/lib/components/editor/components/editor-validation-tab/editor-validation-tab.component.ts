import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilderService } from 'projects/form-builder/src/lib/form-builder.service';

@Component({
  selector: 'jk-editor-validation-tab',
  templateUrl: './editor-validation-tab.component.html',
  styleUrls: ['./editor-validation-tab.component.scss']
})
export class EditorValidationTabComponent implements OnInit {

  @Input() form: FormGroup;
  private type;
  constructor(
    private service: FormBuilderService
  ) {
    //
  }

  ngOnInit() {
    this.type = this.form.parent.value.main.type;
  }

  isWithout(what) {
    return !this.service.isWithout(what, this.type);
  }

  isWith(what) {
    return this.service.isWith(what, this.type);
  }
}
