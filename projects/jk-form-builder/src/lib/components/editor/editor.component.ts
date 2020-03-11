import { Component, OnInit, OnDestroy } from '@angular/core';
import { JkFormBuilderService } from '../../jk-form-builder.service';
import { JkFormBuilderAction } from '../../interface/jk-form-builder.actions';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ng-jk-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  form: FormGroup;
  field: any;
  subs: Subscription[];
  activeTab: any;
  inputPath: string[];
  allFieldsKeys: { key: string, id: string }[];

  constructor(
    private service: JkFormBuilderService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.subs = [
      this.watchEvents()
    ];
  }

  private watchEvents() {
    return this.service.events.subscribe( x => {
      if (x.data && x.data.data) {
        this.inputPath = this.service.getInputOriginPath(x.data.data).reverse();
        const allFields  = this.service.getFieldOrigin(x.data.data).fieldGroup;
        this.allFieldsKeys = this.service.getAllFieldKeys(allFields);
        this.field = this.service.clone(x.data.data);
        this.buildForm();
      }
    });
  }

  private buildForm() {
    const {
      key,
      type,
      defaultValue,
    } = this.field;
    const {
      label, id,
      required, maxLength, minLength, min, max,
    } = this.field.templateOptions;

    const finalType = type === 'input' ? `${type}-${this.field.templateOptions.type}` : type;
    const mainForm = this.fb.group({
      key: [key],
      label: [label],
      type: [finalType],
      defaultValue: this.getDefaultValue(defaultValue),
      formId: id,
    });
    const layoutForm = this.fb.group({
      column: this.getCurrentFieldColumn(),
    });
    const validationForm = this.fb.group({
      required,
      minLength,
      maxLength,
      max,
      min
    });

    let allForm = {
      main: mainForm,
      options: new FormArray([]),
      layout: layoutForm,
      validation: validationForm
    };

    if (this.service.isWith('options', this.field.type)) {
      const options = this.getCurrentFieldOptions();
      allForm = {
        ...allForm,
        options,
      };
    }

    this.form = this.fb.group(allForm);
  }

  private getDefaultValue(def) {
    switch (this.field.type) {
      case 'formly-group':
        return '';
      case 'checkboxes':
        let fromOptions = {};
        this.field.fieldGroup.forEach( x => {
          fromOptions = {
            ...fromOptions,
            ...{ [x.key]: false }
          };
        });
        return this.fb.group(def || fromOptions);
      default:
        return def;
    }
  }

  private getCurrentFieldColumn() {
    const className = (this.field.className || '').split('col-md-');
    if (className[1]) {
      return className[1].split(' ')[0];
    }
    return '';
  }

  close() {
    this.service.dispatchAction(JkFormBuilderAction.EDIT_INPUT, {
      value: false,
      data: null
    });
  }

  onTabSelect(tab) {
    this.activeTab = tab;
  }

  isTab(tabValue) {
    return this.activeTab && this.activeTab.value === tabValue;
  }

  update() {
    const formValue = this.form.value;
    const main = formValue.main;
    const layout = formValue.layout;
    const validation = formValue.validation;

    if (!this.isValidForm()) { return; }

    if (main.type !== 'formly-group' && main.type !== 'form') {
      const type = main.type.split('-');
      this.field.templateOptions.label = main.label;
      this.field.templateOptions = {
        ...this.field.templateOptions,
        ...validation
      };

      this.field.type = type[0];
      this.field.key = main.key;
      this.field.className = this.generateNewFieldClassName(layout);
      this.field.wrappers = [];
      this.field.defaultValue = main.defaultValue;
      if (type.length > 1) {
        this.field.templateOptions.type = type[1];
      }
      this.updateFieldOptions(formValue);
    } else if (main.type === 'form') {
      this.field = {
        type: 'form',
        className: this.generateNewFieldClassName(layout),
        templateOptions: {
          id: main.formId,
          label: this.service.formSelectionOptions.filter( x => x.id === main.formId)[0].name,
        }
      };
    } else {
      const fieldGroup = this.field.fieldGroup;
      this.field = {
        wrappers: ['form-group'],
        className: this.generateNewFieldClassName(layout),
        key: main.key,
        templateOptions: {
          label: main.label
        },
        type: 'formly-group',
      };
      if (fieldGroup) {
        this.field = {
          ...this.field,
          fieldGroup
        };
      }
    }

    this.close();
    this.service.dispatchAction(JkFormBuilderAction.UPDATE_INPUT, {
      path: this.inputPath,
      field: this.field
    });
  }

  private isValidForm() {
    const { type, key, label } = this.form.value.main;
    if (!this.service.isWithout('requiredKey', type)) {
      if (!key) {
        alert('Key field is required');
        return false;
      }
    }
    if (this.service.isWith('requiredLabel', type)) {
      if (!label) {
        alert('Label field is required');
        return false;
      }
    }

    if (this.isFieldKeyAlreadyExist(key)) {
      alert('Field key already exist');
      return false;
    }
    return true;
  }

  isFieldKeyAlreadyExist(key) {
    const existingKey = this.allFieldsKeys.filter( x => x.key === key);
    return existingKey.length > 0 && this.field.id !== existingKey[0].id;
  }

  private generateNewFieldClassName(layout) {
    const currentClass = this.field.className || '';
    const currentColumn = this.getCurrentFieldColumn();
    const newClass = currentClass.replace(`col-md-${currentColumn}`, `col-md-${layout.column}`);
    return newClass;
  }

  private updateFieldOptions(formValue) {
    if (this.service.isWith('options', this.field.type)) {
      if (this.isObjectType(this.field.type)) {
        // NOTE: For multiple checkbox
        const formatted = formValue.options.map( x => {
          return {
            key: x.id,
            templateOptions: {
              label: x.label
            }
          };
        });
        delete this.field.templateOptions.options;
        this.field.fieldGroup = formatted;
      } else {
        delete this.field.fieldGroup;
        this.field.templateOptions.options = formValue.options;
      }
      return;
    }
    delete this.field.templateOptions.options;
    if (this.field.type !== 'formly-group') {
      delete this.field.fieldGroup;
    }
  }

  private getCurrentFieldOptions() {
    const isObjectType = this.isObjectType(this.field.type);
    const currentOptions = isObjectType
        ? this.field.fieldGroup
        : this.field.templateOptions.options;
    const options = new FormArray([]);
    ( currentOptions || [] ).forEach( x => {
      const option = new FormGroup({
        id: new FormControl(isObjectType ? x.key : x.id),
        label: new FormControl(isObjectType ? x.templateOptions.label : x.label)
      });
      options.push(option);
    });
    return options;
  }

  private isObjectType(type) {
    return type === 'checkboxes';
  }

  ngOnDestroy() {
    this.subs.forEach( x =>  x.unsubscribe());
  }
}
