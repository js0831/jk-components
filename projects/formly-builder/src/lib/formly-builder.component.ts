import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class FormlyBuilderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() form: FormGroup;
  @Input() model: any;
  @Input() options: FormlyFormOptions;
  @Input() fields: FormlyFieldConfig[];
  @Input() editable = true;
  @Output() onsave: EventEmitter<FormlyFieldConfig[]> = new EventEmitter<FormlyFieldConfig[]>();
  // @Input() json = false;


  show = true;
  private savedFields: any[];

  private subs: Subscription[];

  constructor(
    private srv: FormlyBuilderService
  ) { }

  ngOnInit() {
    FormlyBuilderService.editable = this.editable;
    this.defaultFields();
    this.savedFields = JSON.parse(JSON.stringify(this.fields));
    this.subs = [
      this.watchEvents(),
    ];
  }

  ngOnChanges() {
    setTimeout( x => {
      this.form.reset();
    }, 250);
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
    const {
      label,
      options,
      placeholder,
      multiple,
      required, pattern,
      max, min,
      maxLength, minLength
    } = data.field.template;

    const {key, type, className, fieldGroup, defaultValue} = data.field.input;
    field.templateOptions.label = label;
    field.templateOptions.placeholder = placeholder;
    field.templateOptions.options = options;
    field.templateOptions.multiple = multiple;

    field.templateOptions.required = required;
    field.templateOptions.max = max;
    field.templateOptions.maxLength = maxLength;
    field.templateOptions.min = min;
    field.templateOptions.minLength = minLength;
    field.templateOptions.pattern = pattern;

    field.key = key;
    field.defaultValue = defaultValue;
    field.type = type;
    field.className = className;
    field.fieldGroup = fieldGroup;
    this.fields = clonedFields;
    this.reload();
  }

  private addRow(direction: 'above' | 'below', field) {
    const parent = field.parent;
    const gparent = parent.parent;
    let index = null;

    gparent.fieldGroup.forEach((o, i) => {
      if (o.id === parent.id) {
        index = i;
      }
    });
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
    this.savedFields = this.deleteUnnecessaryProperties(JSON.parse(JSON.stringify(this.fields)));

    this.onsave.emit(this.savedFields);
  }

  // Delete focus and _keypath
  private deleteUnnecessaryProperties(fields: any[]) {
    return fields.map( x => {
      x.fieldGroup = x.fieldGroup.map( y => {
        if (y._keyPath) {
          delete y._keyPath;
        }
        if (y.templateOptions) {
          delete y.templateOptions.focus;
        }
        if (y.fieldGroup && y.fieldGroup.length > 0) {
          y.fieldGroup = this.deleteUnnecessaryProperties(y.fieldGroup);
        }
        return y;
      });
      return x;
    });
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
