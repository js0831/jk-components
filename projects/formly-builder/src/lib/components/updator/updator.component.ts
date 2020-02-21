import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormlyBuilderService } from '../../formly-builder.service';
import { Subscription } from 'rxjs';
import { FieldType } from '@ngx-formly/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
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
        this.addOptionTab();
      }
    });
  }

  private addOptionTab() {
    if (this.isWithOptionTab(this.form.value.main.type)) {
      if (this.tabs.indexOf('Options')  === -1) {
        this.tabs.push('Options');
      }
    } else {
      this.tabs = this.tabs.filter( x => x !== 'Options');
    }
  }

  private isWithOptionTab(type) {
    const types = ['select', 'input-radio', 'input-checkbox-multiple'];
    return types.indexOf(type) >= 0;
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

    const mainForm = this.formBuilder.group({
      label: this.field.template.label,
      key: this.field.input.key,
      type: this.field.input.type,
    });

    const layoutForm = this.formBuilder.group({
      column: this.getCurrentColumnValue(),
      view: this.getCurrentViewValue()
    });

    const validationForm = this.formBuilder.group({
      required: !!this.field.template.required,
    });

    let formGroup = {
      main: mainForm,
      layout: layoutForm,
      validation: validationForm,
      options: new FormArray([]),
    };

    if (this.isWithOptionTab(this.field.input.type)) {
      const options = this.getCurrentFieldOptions();
      formGroup = {
        ...formGroup,
        options,
      };
    }

    this.form = this.formBuilder.group(formGroup);
    this.form.get('main').get('type').valueChanges.subscribe( x => {
      setTimeout(() => {
        this.addOptionTab();
      });
    });
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
    const value = this.form.value;
    const cloneField = JSON.parse(JSON.stringify(this.field));
    cloneField.template.label = value.main.label;
    cloneField.template.required = value.validation.required;

    cloneField.input.key = value.main.key;
    cloneField.input.type = value.main.type;
    cloneField.input.className = this.getNewViewValue(value.layout.view, this.field.className);
    cloneField.input.className = this.getNewColumnValue(value.layout.column, cloneField.input.className);

    if (this.isWithOptionTab(value.main.type)) {

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
