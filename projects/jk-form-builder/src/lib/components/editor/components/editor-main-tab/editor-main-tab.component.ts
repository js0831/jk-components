import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CONSTANT } from 'projects/jk-form-builder/src/lib/interface/jk-constant';
import { JkFormBuilderService } from 'projects/jk-form-builder/src/lib/jk-form-builder.service';
import { JkFormBuilderAction } from 'projects/jk-form-builder/src/lib/interface/jk-form-builder.actions';
import { JkFormTypeSelectionInterface } from 'projects/jk-form-builder/src/lib/interface/jk-form-type-selection.interface';
import { FormBuilderConfigService } from 'projects/jk-form-builder/src/lib/config/form-builder-config.service';
import { FormBuilderConfig } from 'projects/jk-form-builder/src/lib/config/form-builder.config';


@Component({
  selector: 'ng-jk-editor-main-tab',
  templateUrl: './editor-main-tab.component.html',
  styleUrls: ['./editor-main-tab.component.scss']
})
export class EditorMainTabComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  private subs: Subscription[];
  private initialDefaultValueForm: any;
  private initialFieldType: string;

  inputTypes = this.service.clone(CONSTANT.inputTypes);
  formLoaded = true;
  formSelectionOptions: JkFormTypeSelectionInterface[] = [];

  constructor(
    private service: JkFormBuilderService,
    private fb: FormBuilder,
    @Inject(FormBuilderConfigService) private config: FormBuilderConfig,
  ) {
    //
  }

  ngOnInit() {
    this.subs = [
      this.watchFieldTypeOnChange()
    ];
    this.initialDefaultValueForm = this.form.get('defaultValue');
    this.initialFieldType = this.form.value.type;

    this.formSelectionOptions = this.service.formSelectionOptions;

    if (!this.allowFormSelection()) {
      this.inputTypes.others.fields = this.inputTypes.others.fields.filter( x => x.value !== 'form');
    }
  }

  get inputTypeGroups() {
    return Object.keys(this.inputTypes);
  }

  private watchFieldTypeOnChange() {
    const type = this.form.get('type');
    return type.statusChanges.subscribe( x => {
      this.formLoaded = false;
      this.service.dispatchAction(JkFormBuilderAction.INPUT_TYPE_CHANGE, type.value);
      this.updateFormControlDefaultValue();
      this.form.parent.get('validation').reset();
    });
  }

  isWithout(what) {
    return !this.service.isWithout(what, this.form.value.type);
  }

  isWith(what) {
    return this.service.isWith(what, this.form.value.type);
  }


  allowFormSelection() {
    const withOptions = ( this.formSelectionOptions && this.formSelectionOptions.length > 0 );
    const withAPI = this.config.apiURL && this.config.apiURL.length > 0;
    return withOptions && withAPI;
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
