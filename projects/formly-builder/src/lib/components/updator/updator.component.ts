import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormlyBuilderService } from '../../formly-builder.service';
import { Subscription } from 'rxjs';
import { FieldType } from '@ngx-formly/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  inputTypeOptions = [
    {
      label: 'Empty',
      value: 'input-empty'
    },
    {
      label: 'Input Text',
      value: 'input-text'
    },
    {
      label: 'Textarea',
      value: 'input-textarea'
    }
  ];

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
      }
    });
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

  private getNewViewValue(value: string) {
    const classNames = (this.field.input.className || '').split(' ');
    const removeExisting = classNames.filter( x => {
      return !(x.split('--horizontal').length > 1 || x.split('--vertical').length > 1);
    });
    removeExisting.push(`formx__column--${value}`);
    return removeExisting.join(' ');
  }

  private getNewColumnValue(value: string) {
    let classNames = this.field.input.className;
    for (let i = 12; i >= 1; i--) {
      classNames = classNames.replace(`formx__column--w${i}`, '');
    }
    return `${classNames} formx__column--w${value}`;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      label: this.field.template.label,
      key: this.field.input.key,
      type: this.field.input.type,
      view: this.getCurrentViewValue(),
      column: this.getCurrentColumnValue(),
      required: !!this.field.template.required
    });
  }

  update() {
    const value = this.form.value;
    this.field.template.label = value.label;
    this.field.input.key = value.key;
    this.field.input.type = value.type;
    this.field.input.className = this.getNewViewValue(value.view);
    this.field.input.className = this.getNewColumnValue(value.column);
    this.field.template.required = value.required;
    this.srv.saveInput();
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
