import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilderService } from '../../form-builder.service';
import { FormBuilderAction } from '../../interface/form-builder.actions';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jk-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  form: FormGroup;
  field: any;
  subs: Subscription[];
  activeTab: any;
  inputPath: string[];

  constructor(
    private service: FormBuilderService,
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
        this.field = JSON.parse(JSON.stringify(x.data.data));
        this.buildForm();
      }
    });
  }

  private buildForm() {
    const {
      key,
      type
    } = this.field;

    const {
      label,
    } = this.field.templateOptions;

    const finalType = type === 'input' ? `${type}-${this.field.templateOptions.type}` : type;
    const mainForm = this.fb.group({
      key: [key],
      label: [label],
      type: [finalType]
    });
    const layoutForm = this.fb.group({
      column: this.getCurrentFieldColumn(),
    });

    let allForm = {
      main: mainForm,
      options: new FormArray([]),
      layout: layoutForm
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

  private getCurrentFieldColumn() {
    const className = (this.field.className || '').split('col-md-');
    if (className[1]) {
      return className[1].split(' ')[0];
    }
    return '';
  }

  close() {
    this.service.dispatchAction(FormBuilderAction.EDIT_INPUT, {
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

    const type = main.type.split('-');
    this.field.templateOptions.label = main.label;
    this.field.type = type[0];
    this.field.key = main.key;
    this.field.className = this.generateNewFieldClassName(layout);
    if (type.length > 1) {
      this.field.templateOptions.type = type[1];
    }

    this.updateFieldOptions(formValue);
    this.close();
    this.service.dispatchAction(FormBuilderAction.UPDATE_INPUT, {
      path: this.inputPath,
      field: this.field
    });
  }

  private generateNewFieldClassName(layout) {
    const currentClass = this.field.className;
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
    }
  }

  private getCurrentFieldOptions() {
    const isObjectType = this.isObjectType(this.field.type);
    const currentOptions = isObjectType
        ? this.field.fieldGroup
        : this.field.templateOptions.options;
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

  private isObjectType(type) {
    return type === 'checkboxes';
  }

  ngOnDestroy() {
    this.subs.forEach( x =>  x.unsubscribe());
  }
}
