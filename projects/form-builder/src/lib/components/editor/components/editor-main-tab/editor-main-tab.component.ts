import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CONSTANT } from 'projects/form-builder/src/lib/interface/constant';
import { FormBuilderService } from 'projects/form-builder/src/lib/form-builder.service';
import { FormBuilderAction } from 'projects/form-builder/src/lib/interface/form-builder.actions';


@Component({
  selector: 'jk-editor-main-tab',
  templateUrl: './editor-main-tab.component.html',
  styleUrls: ['./editor-main-tab.component.scss']
})
export class EditorMainTabComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  private subs: Subscription[];
  private initialDefaultValueForm: any;
  private initialFieldType: string;

  inputTypes = CONSTANT.inputTypes;
  formLoaded = true;

  constructor(
    private service: FormBuilderService,
    private fb: FormBuilder
  ) {
    //
  }

  ngOnInit() {
    this.subs = [
      this.watchFieldTypeOnChange()
    ];
    this.initialDefaultValueForm = this.form.get('defaultValue');
    this.initialFieldType = this.form.value.type;
  }

  get inputTypeGroups() {
    return Object.keys(this.inputTypes);
  }

  private watchFieldTypeOnChange() {
    const type = this.form.get('type');
    return type.statusChanges.subscribe( x => {
      this.formLoaded = false;
      this.service.dispatchAction(FormBuilderAction.INPUT_TYPE_CHANGE, type.value);
      this.updateFormControlDefaultValue();
      this.form.parent.get('validation').reset();
    });
  }

  isWithout(what) {
    return !this.service.isWithout(what, this.form.value.type);
  }

  private updateFormControlDefaultValue() {
    setTimeout( x => {
      this.form.removeControl('defaultValue');
      const type = this.form.value.type;
      if (type === this.initialFieldType) {
        this.form.addControl('defaultValue', this.initialDefaultValueForm);
        this.formLoaded = true;
        return;
      }
      if (type !== 'checkboxes') {
        this.form.addControl('defaultValue', new FormControl(''));
      } else {
        let fromOptions = {};
        this.form.parent.value.options.forEach( xx => {
          fromOptions = {
            ...fromOptions,
            ...{ [xx.id]: false }
          };
        });
        this.form.addControl('defaultValue', this.fb.group(fromOptions));
      }
      this.formLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
