import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormlyBuilderService } from '../../formly-builder.service';
import { Subscription } from 'rxjs';
import { FieldType } from '@ngx-formly/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FormlyEvent, FormlyAction } from '../../interface/formly-event.interface';

@Component({
  selector: 'jk-updator',
  templateUrl: './updator.component.html',
  styleUrls: ['./updator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdatorComponent implements OnInit, OnDestroy {

  field: any;
  form: FormGroup;
  private subs: Subscription[];
  show = false;
  tabs = ['Main', 'Layout', 'Validation'];
  selectedTab = this.tabs[0];

  private withoutTab = {
    options: ['select', 'input-radio', 'input-checkbox-multiple'],
    validation: ['input-text',
    'input-date',
    'input-email',
    'input-number',
    'input-password',
    'input-time',
    'input-textarea',
    'input-radio',
    'input-checkbox',
    'input-checkbox-multiple',
    'select']
  };

  constructor(
    private srv: FormlyBuilderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subs = [
      this.watchEvents(),
    ];
  }

  private watchEvents() {
    return this.srv.events.subscribe( (x: FormlyEvent) => {
      if (x.action === FormlyAction.EDIT_INPUT) {
        this.field = x.data;
        this.buildForm();
        this.show = true;
        this.selectedTab = this.tabs[0];
        this.addTab('Options');
        this.addTab('Validation');
      }
    });
  }

  private addTab(tab: string) {
    if (this.without(tab.toLowerCase(), this.form.value.main.type)) {
      if (this.tabs.indexOf(tab)  === -1) {
        this.tabs.push(tab);
      }
    } else {
      this.tabs = this.tabs.filter( x => x !== tab);
    }
  }

  without(tab, type) {
    return this.withoutTab[tab].indexOf(type) >= 0;
  }

  private isObjectType(type) {
    return type === 'input-checkbox-multiple';
  }

  private getCurrentViewValue() {
    const className = this.field.input.className;
    return className.indexOf('formx__column--horizontal') >= 0 ? 'horizontal' : 'vertical';
  }

  private getCurrentColumnValue() {
    const className = this.field.input.className;
    const split = className.split('formx__column--w');
    if (split.length > 1) {
      return split[1].split(' ')[0];
    }
    return '';
  }

  private getNewViewValue(value: string, currentClassName: string) {
    const classNames = (this.field.input.className || '').split(' ');
    const removeExisting = classNames.filter( x => {
      return !(x.split('--horizontal').length > 1 || x.split('--vertical').length > 1);
    });
    removeExisting.push(`formx__column--${value}`);
    return removeExisting.join(' ');
  }

  private getNewColumnValue(value: string, currentClassName: string) {
    let classNames = currentClassName;
    for (let i = 12; i >= 1; i--) {
      classNames = classNames.replace(`formx__column--w${i}`, '');
    }
    return `${classNames} formx__column--w${value}`;
  }

  private buildForm() {

    const defaultValue = this.getDefaultValue(this.field.input.defaultValue, this.field.input.type);

    const mainForm = this.formBuilder.group({
      label: this.field.template.label,
      placeholder: this.field.template.placeholder,
      multiple: this.field.template.multiple,
      key: this.field.input.key,
      type: this.field.input.type,
      defaultValue
    });

    const layoutForm = this.formBuilder.group({
      column: this.getCurrentColumnValue(),
      view: this.getCurrentViewValue()
    });

    const validationForm = this.formBuilder.group({
      required: !!this.field.template.required,
      minLength: this.field.template.minLength,
      maxLength: this.field.template.maxLength,
      // pattern: this.field.template.pattern,
      min: this.field.template.min,
      max: this.field.template.max,
    });

    let formGroup = {
      main: mainForm,
      layout: layoutForm,
      validation: validationForm,
      options: new FormArray([]),
    };

    if (this.without('options', this.field.input.type)) {
      const options = this.getCurrentFieldOptions();
      formGroup = {
        ...formGroup,
        options,
      };
    }

    this.form = this.formBuilder.group(formGroup);
    this.form.get('main').get('type').valueChanges.subscribe( x => {
      setTimeout(() => {
        this.addTab('Options');
        this.addTab('Validation');
        this.setConditionalRequiredFields();
      });
    });
  }



  private setConditionalRequiredFields() {
    const key = this.form.get('main').get('key');
    const label = this.form.get('main').get('label');
    const typeValue = this.form.value.main.type;

    if (['empty', 'section-title'].indexOf(typeValue) >= 0) {
      key.setValidators(null);
    } else {
      key.setValidators(Validators.required);
    }
    key.updateValueAndValidity();

    if (typeValue === 'section-title') {
      label.setValidators(Validators.required);
    } else {
      label.setValidators(null);
    }
    label.updateValueAndValidity();
  }

  private getCurrentFieldOptions() {
    const isObjectType = this.isObjectType(this.field.input.type);
    const currentOptions = isObjectType
        ? this.field.input.fieldGroup
        : this.field.template.options;
    const options = new FormArray([]);
    currentOptions.forEach( x => {
      const option = new FormGroup({
        id: new FormControl(isObjectType ? x.key : x.id),
        label: new FormControl(isObjectType ? x.templateOptions.label : x.label)
      });
      options.push(option);
    });
    return options;
  }

  update() {
    if (!this.isValidForm()) { return; }

    const value = this.form.value;
    const cloneField = JSON.parse(JSON.stringify(this.field));
    const defaultValue = this.getDefaultValue(value.main.defaultValue, value.main.type);
    cloneField.template.label = value.main.label;
    cloneField.template.placeholder = value.main.placeholder;
    cloneField.template.multiple = value.main.multiple;

    cloneField.template.required = value.validation.required;
    cloneField.template.max = value.validation.max;
    cloneField.template.maxLength = value.validation.maxLength;
    cloneField.template.min = value.validation.min;
    cloneField.template.minLength = value.validation.minLength;
    // cloneField.template.pattern = value.validation.pattern;

    cloneField.input.key = value.main.key;
    cloneField.input.defaultValue = defaultValue;
    cloneField.input.type = value.main.type;
    cloneField.input.className = this.getNewViewValue(value.layout.view, this.field.className);
    cloneField.input.className = this.getNewColumnValue(value.layout.column, cloneField.input.className);

    if (this.without('options', value.main.type)) {

      if (this.isObjectType(value.main.type)) {
        // NOTE: For multiple checkbox
        const formatted = value.options.map( x => {
          return {
            key: x.id,
            templateOptions: {
              label: x.label
            }
          };
        });
        cloneField.input.fieldGroup = formatted;
      } else {
        cloneField.template.options = value.options;
      }
    }

    const path = this.srv.getInputOriginPath(this.field.input);
    this.srv.saveInput(path, cloneField);
    this.show = false;
  }

  private isValidForm() {
    const main = this.form.get('main');
    if (main.get('key').invalid) {
      alert('Key field is required');
      return false;
    }

    if (main.get('label').invalid) {
      alert('Label field is required');
      return false;
    }
    return true;
  }

  private getDefaultValue(defaultValue, type) {
    let def = defaultValue;
    if (def === undefined || def === null) {
      if (type === 'input-checkbox-multiple') {
        def = {};
      } else {
        def = '';
      }
    }

    const falsy = [0, '0', false, 'false', '', null, undefined];
    if (type === 'input-checkbox') {
      return !(falsy.indexOf(def) >= 0);
    } else if (type === 'input-checkbox-multiple') {

      if (typeof def === 'string') {
        let defObject = {};
        def.split(',').forEach( x => {
          if (x.length > 0) {
            defObject = {
              ...defObject,
              [x.trim()]: true
            };
          }
        });
        return defObject;
      } else {
        return Object.keys(def).join(',');
      }

    }
    return def;
  }

  cancel() {
    this.show = false;
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
