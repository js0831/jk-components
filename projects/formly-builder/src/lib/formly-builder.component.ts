import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { FormlyBuilderService } from './formly-builder.service';
import { Subscription } from 'rxjs';
import { FormlyEvent, FormlyAction } from './interface/formly-event.interface';

@Component({
  selector: 'jk-formly-builder',
  templateUrl: 'formly-builder.component.html',
  styleUrls: ['formly-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormlyBuilderComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() model: any;
  @Input() options: FormlyFormOptions;
  @Input() fields: FormlyFieldConfig[];
  @Input() editable = true;
  @Output() onsave: EventEmitter<FormlyFieldConfig[]> = new EventEmitter<FormlyFieldConfig[]>();
  // @Input() json = false;


  show = true;
  private savedFields: FormlyFieldConfig[];

  private subs: Subscription[];

  constructor(
    private srv: FormlyBuilderService
  ) { }

  ngOnInit() {
    FormlyBuilderService.editable = this.editable;
    this.defaultFields();
    this.save();
    this.subs = [
      this.watchEvents(),
    ];

  }

  private defaultFields() {
    if (!this.fields || this.fields.length === 0) {
      this.fields = [
        {
          fieldGroupClassName: 'formx__row',
          fieldGroup: [
            { type: 'empty', className: 'formx__column formx__column--w6', },
            { type: 'empty', className: 'formx__column formx__column--w6', }
          ]
        },
        {
          fieldGroupClassName: 'formx__row',
          fieldGroup: [
            { type: 'empty', className: 'formx__column formx__column--w6', },
            { type: 'empty', className: 'formx__column formx__column--w6', }
          ]
        },
      ];
    }
  }

  private watchEvents() {
    return this.srv.events.subscribe( (x: FormlyEvent) => {
      switch (x.action) {
        case FormlyAction.UPDATE_INPUT:
          this.updateFieldConfig(x.data);
          break;
        case FormlyAction.DELETE_INPUT:
          this.deleteInput(x.data);
          break;
        case FormlyAction.DELETE_ROW:
          this.deleteRow(x.data);
          break;
        case FormlyAction.ADD_COLUMN_NEXT:
          this.addColumn('next', x.data);
          break;
        case FormlyAction.ADD_COLUMN_PREVIOUS:
          this.addColumn('prev', x.data);
          break;
        case FormlyAction.ADD_ROW_ABOVE:
          this.addRow('above', x.data);
          break;
        case FormlyAction.ADD_ROW_BELOW:
          this.addRow('below', x.data);
          break;
        default:
          break;
      }
    });
  }

  private updateFieldConfig(data) {
    this.form = new FormGroup({});
    this.model = {};
    const clonedFields = JSON.parse(JSON.stringify(this.fields));
    const field = this.srv.getFieldByPath(data.path, clonedFields);
    const {label, required, options, placeholder, multiple} = data.field.template;
    const {key, type, className, fieldGroup, defaultValue} = data.field.input;
    field.templateOptions.label = label;
    field.templateOptions.placeholder = placeholder;
    field.templateOptions.required = required;
    field.templateOptions.options = options;
    field.templateOptions.multiple = multiple;

    field.key = key;
    field.defaultValue = defaultValue;
    field.type = type;
    field.className = className;
    field.fieldGroup = fieldGroup;
    this.fields = clonedFields;
    this.reload();
  }

  private addRow(direction: 'above' | 'below', field) {
    const id = field.parent.id;
    let index = parseInt(id.split('_')[id.split('_').length - 1], 0);
    if (direction === 'below') {
      index += 1;
    }

    field.parent.parent.fieldGroup.splice(index, 0, this.newRow);
    this.reload();
  }

  private get newRow() {
    return {
      fieldGroupClassName: 'formx__row',
      fieldGroup: [
        {
          type: 'empty',
          className: 'formx__column',
        },
        {
          type: 'empty',
          className: 'formx__column',
        }
      ],
    };
  }

  private get newColumn() {
    return {
      type: 'empty',
      className: 'formx__column',
    };
  }

  private addColumn(direction: 'next' | 'prev', field) {
    const id = field.id;
    let index = parseInt(id.split('_')[id.split('_').length - 1], 0);

    if (direction === 'next') {
      index += 1;
    }

    field.parent.fieldGroup.splice(index, 0, Object.assign({}, this.newColumn));
    this.reload();
  }

  private deleteInput(field) {
    const parent = field.parent;
    parent.fieldGroup = parent.fieldGroup.filter( x => {
      return x.id !== field.id;
    });
  }

  private deleteRow(field) {
    field.parent.fieldGroup = [];
    this.fields = this.fields.filter( x => {
      return x.id !== field.parent.id;
    });
    this.reload();
  }

  private reload() {
    this.show = false;
    setTimeout( x => {
      this.show = true;
    });
  }

  save() {
    this.savedFields = JSON.parse(JSON.stringify(this.fields));
    this.onsave.emit(this.savedFields);
  }

  reset() {
    this.show = false;
    this.form = new FormGroup({});
    this.model = {};
    this.fields = this.savedFields;
    this.reload();
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
