import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilderService } from '../../form-builder.service';
import { FormBuilderAction } from '../../interface/form-builder.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jk-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  form: FormGroup;
  field: any;
  template: any;
  subs: Subscription[];
  activeTab: any;

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
        this.field = x.data.data.field;
        this.template = x.data.data.template;
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
    } = this.template;

    const finalType = type === 'input' ? `${type}-${this.template.type}` : type;
    const main = this.fb.group({
      key: [key],
      label: [label],
      type: [finalType]
    });

    this.form = this.fb.group({
      main,
    });
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

    const type = main.type.split('-');
    this.template.label = main.label;
    this.field.type = type[0];
    this.field.key = main.key;
    if (type.length > 1) {
      this.template.type = type[1];
    }
    this.close();
    this.service.dispatchAction(FormBuilderAction.UPDATE_INPUT);
  }

  ngOnDestroy() {
    this.subs.forEach( x =>  x.unsubscribe());
  }
}
