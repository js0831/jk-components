import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JkFormBuilderService } from './jk-form-builder.service';
import { Subscription, Observable } from 'rxjs';
import { FormBuilderAction } from './interface/form-builder.actions';
import { CONSTANT } from './interface/constant';
import { FormBuilderConfig } from './interface/form-builder-config';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormTypeSelectionInterface } from './interface/form-type-selection.interface';

@Component({
  selector: 'ng-jk-form-builder',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'jk-form-builder.component.html',
  styleUrls: ['jk-form-builder.component.scss']
})
export class JkFormBuilderComponent implements OnInit, OnDestroy {

  @Input() editable = true;
  @Input() config: FormBuilderConfig;
  @Output() onsave: EventEmitter<FormlyFieldConfig[]> = new EventEmitter<FormlyFieldConfig[]>();
  @Input() forms?: FormTypeSelectionInterface[];

  private initialFields = [
    {
      fieldGroupClassName: 'form-row',
      fieldGroup: [
        {
          type: 'blank',
          className: 'form-group col-md-4'
        },
        {
          type: 'blank',
          className: 'form-group col-md-4'
        },
        {
          type: 'blank',
          className: 'form-group col-md-4'
        },
      ]
    }
  ];

  subs: Subscription[];
  isEdit = false;
  isEditForm = false;
  show = false;
  mode: 'edit' | 'preview' = 'edit';
  private savedFields: FormlyFieldConfig[];
  private beforePreviewFields: FormlyFieldConfig[];

  constructor(
    private service: JkFormBuilderService
  ) { }

  async ngOnInit() {
    this.setFormsListOptions();
    this.putInitialFields();
    this.subs = [
      this.watchEvents()
    ];
    this.backup();

    if (!this.editable) {
      this.loadForms();
    }
    this.show = true;
  }

  // Note: selection options on form type
  private setFormsListOptions() {
    if (this.forms && this.forms.length > 0) {
      this.service.setFormsSelectionOptions(this.forms);
    }
  }

  private async loadForms() {
    const forms = await this.service.loadForms(this.config.fields);
    this.config.fields = forms as FormlyFieldConfig[];
  }

  private backup() {
    setTimeout( x => {
      this.savedFields = this.service.clone(this.config.fields);
    }, 250);
  }

  private putInitialFields() {
    if (this.config && (!this.config.fields || this.config.fields.length === 0)) {
      this.config.fields = this.service.clone(this.initialFields);
    }
  }

  private watchEvents() {
    return this.service.events.subscribe( x => {
      switch (x.action) {
        case FormBuilderAction.EDIT_INPUT:
          this.isEdit = x.data.value;
          break;
        case FormBuilderAction.UPDATE_INPUT:
          this.updateInput(x.data);
          break;
        case FormBuilderAction.EDIT_FORM:
          this.isEditForm = x.data.value;
          break;
        case FormBuilderAction.APPLY_FORM_ACTION:
          this.isEditForm = false;
          this.applyFormAction(x.data);
          break;
        default:
          break;
      }
    });
  }

  private applyFormAction(data) {
    switch (data.action) {
      case 'delete_column':
        this.deleteInput(data.field);
        break;
      case 'delete_row':
        this.deleteRow(data.field);
        break;
      case 'add_column_next':
        this.addColumn('next', data.field, CONSTANT.newColumn);
        break;
      case 'add_column_prev':
        this.addColumn('prev', data.field, CONSTANT.newColumn);
        break;
      case 'add_row_above':
        this.addRow('above', data.field, CONSTANT.newRow);
        break;
      case 'add_row_below':
        this.addRow('below', data.field, CONSTANT.newRow);
        break;
      case 'duplicate_row':
        this.duplicate('row', data.field);
        break;
      case 'duplicate_column':
        this.duplicate('column', data.field);
        break;
      case 'insert_row':
        this.insertRow(data.field);
        break;
      default:
        break;
    }
    this.reloadForm();
  }

  private deleteInput(field) {
    const parent = field.parent;
    const className = field.className;


    // Note: Delete row instead of column when one column remaining
    if (parent.parent.fieldGroup.length > 1 && parent.fieldGroup.length === 1) {
      this.deleteRow(field);
      return;
    }

    parent.fieldGroup = parent.fieldGroup.filter( x => {
      return x.id !== field.id;
    });


    // Note: Append blank column to avoid empty form
    if (parent.parent.fieldGroup.length === 1 && parent.fieldGroup.length === 0) {
      parent.fieldGroup = [
        {
          type: 'blank',
          className,
        }
      ];
    }
  }

  private insertRow(field) {
    field.fieldGroup = [
      ...(field.fieldGroup || []),
      this.service.clone(CONSTANT.newRow)
    ];
  }

  private deleteRow(field) {
    field.parent.fieldGroup = [];
    this.config.fields = this.config.fields.filter( x => {
      return x.id !== field.parent.id;
    });

    if ( this.config.fields.length === 0) {
      this.config.fields = this.service.clone(this.initialFields);
    }
  }

  private duplicate(what: 'column' | 'row', field) {
    if (what === 'column') {
      const duplidateColumn = this.service.clone(field);
      const stamp = Math.floor(Date.now() / 1000);

      if ('formly-group' === duplidateColumn.type || !duplidateColumn.key) {
        delete duplidateColumn.key;
      } else {
        duplidateColumn.key = `${duplidateColumn.key}_${stamp}`;
      }

      delete duplidateColumn.id;
      this.deleteFieldGroupMembersID(duplidateColumn);
      this.addColumn('next', field, duplidateColumn);

    } else {
      const duplidateRow = this.service.clone(field.parent);
      delete duplidateRow.id;
      duplidateRow.fieldGroup = duplidateRow.fieldGroup.map( x => {
        const stamp = Math.floor(Date.now() / 1000);

        if (x.key && 'formly-group' !== x.type) {
          x.key = `${x.key || ''}_${stamp}`;
        } else {
          delete x.key;
        }

        this.deleteFieldGroupMembersID(x);
        delete x.id;
        return x;
      });
      this.addRow('below', field, duplidateRow);
    }
  }

  private deleteFieldGroupMembersID(field) {
    if (field.fieldGroup && field.fieldGroup.length > 0) {
      field.fieldGroup = field.fieldGroup.map( x => {
        delete x.id;
        return x;
      });
    }
  }

  private addColumn(direction: 'next' | 'prev', field, newColumn) {
    const id = field.id;
    let index = parseInt(id.split('_')[id.split('_').length - 1], 0);
    if (direction === 'next') {
      index += 1;
    }
    field.parent.fieldGroup.splice(index, 0, Object.assign({}, newColumn));
  }

  private addRow(direction: 'above' | 'below', field, newRow) {
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
    field.parent.parent.fieldGroup.splice(index, 0, newRow);
  }

  private updateInput(data) {
    this.show = false;
    this.config.form = new FormGroup({});
    this.config.model = {};
    const cloneFields = this.service.clone(this.config.fields);
    const newFieldValues = data.field;
    const field = this.service.getFieldByPath(data.path, cloneFields);
    this.service.getFieldByPath(data.path, cloneFields).templateOptions = {
      ...field.templateOptions,
      ...newFieldValues.templateOptions
    };

    field.key = newFieldValues.key;
    field.defaultValue = newFieldValues.defaultValue;
    field.type = newFieldValues.type;
    field.className = newFieldValues.className;
    field.fieldGroup = newFieldValues.fieldGroup;
    if (newFieldValues.wrappers) {
      field.wrappers = newFieldValues.wrappers;
    }
    this.config.fields = cloneFields;
    this.reloadForm();
  }

  private reloadForm() {
    this.resetForm();
    setTimeout( () => {
      this.show = true;
    });
  }

  private resetForm() {
    this.show = false;
    this.config.form = new FormGroup({});
    this.config.model = {};
  }

  save() {
    this.backup();
    this.onsave.emit(this.config.fields);
  }

  reset() {
    this.mode = 'edit';
    this.show = false;
    this.config.fields = this.savedFields;
    this.reloadForm();
  }

  async setMode(mode: 'edit' | 'preview') {
    if (this.mode === mode) { return; }
    this.mode = mode;
    this.show = false;

    if (mode === 'preview') {
      this.beforePreviewFields = this.service.clone(this.config.fields);
      await this.loadForms();
    } else {
      this.config.fields = this.service.clone(this.beforePreviewFields);
    }
    this.show = true;
  }

  modeButtonClass(mode: string) {
    return this.mode === mode ? 'success' : 'secondary';
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }

}
