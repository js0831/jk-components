import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormBuilderService } from './form-builder.service';
import { Subscription } from 'rxjs';
import { FormBuilderAction } from './interface/form-builder.actions';
import { CONSTANT } from './interface/constant';

@Component({
  selector: 'jk-form-builder',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'form-builder.component.html',
  styleUrls: ['form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  subs: Subscription[];
  isEdit = false;
  isEditForm = false;
  show = true;
  form = new FormGroup({});
  model: any = {};
  field: any;
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'form-row',
      fieldGroup: [
        {
          wrappers: ['form-group'],
          className: 'form-group col-md-12',
          templateOptions: {
            label: 'Default Form Title'
          },
          type: 'formly-group',
        },
      ]
    },
    {
      fieldGroupClassName: 'form-row',
      fieldGroup: [
        {
          wrappers: ['form-group'],
          className: 'form-group col-md-12',
          key: 'default',
          type: 'formly-group',
          templateOptions: {
            label: 'Default Form Title'
          },
          fieldGroup: [
            {
              fieldGroupClassName: 'form-row',
              fieldGroup: [
                {
                  type: 'checkboxes',
                  key: 'sports',
                  className: 'form-group col-md-4',
                  templateOptions: {
                    label: 'Sports',
                    // required: true,
                  },
                  // defaultValue: {
                  //   basketball: true,
                  //   taekwondo: false
                  // },
                  fieldGroup: [
                    {
                      key: 'basketball',
                      templateOptions: {
                        label: 'Basketball',
                      },
                    },
                    {
                      key: 'taekwondo',
                      templateOptions: {
                        label: 'Taekwondo',
                      },
                    }
                  ]
                },
                {
                  type: 'blank',
                  className: 'form-group col-md-4',
                },
                {
                  type: 'blank',
                  className: 'form-group col-md-4',
                },
              ]
            },
            {
              fieldGroupClassName: 'form-row',
              fieldGroup: [
                {
                  wrappers: ['form-group'],
                  className: 'form-group col-md-4',
                  key: 'testss',
                  templateOptions: {
                    label: 'Default Form Title'
                  },
                  type: 'formly-group',
                },
                {
                  type: 'text_paragraph',
                  className: 'form-group col-md-4',
                  templateOptions: {
                    label: 'Paragraph'
                  },
                },
                {
                  type: 'text_header',
                  className: 'form-group col-md-4',
                  templateOptions: {
                    label: 'Header'
                  },
                },
              ]
            }
          ]
        }
      ]
    },
  ];

  constructor(
    private service: FormBuilderService
  ) { }

  async ngOnInit() {
    this.subs = [
      this.watchEvents()
    ];


    // await this.test(this.fields);
    // console.log(this.fields);

    // this.service.getFormById('5e5382cf71f9a0bce9b760ec').subscribe( x => {
    //   console.log(x.data.json);
    // });

    // const a = await this.service.getFormById('5e5382cf71f9a0bce9b760ec').toPromise();
    // console.log(a);


    // const test = await this.sample();
    // console.log(test);
    // alert('a')

    // await this.test(this.fields);
    // console.log(this.fields);

    // setTimeout( x => {
    //   this.show = true;
    // }, 2000);
  }


  async test(fields) {
    return fields.map( async (x) => {
      if (x.type !== 'form') {
        if (x.fieldGroup && x.fieldGroup.length > 0) {
          return await this.test(x.fieldGroup);
        } else {
          return x;
        }
      } else {
        const test = await this.getTest(x.id);
        delete x.type;
        x.wrappers = ['form-group'];
        x.key = 'personalInfo';
        x.templateOptions = {
          label: 'Personal Information'
        };
        x.fieldGroup = [
              {
                fieldGroupClassName: 'form-row',
                fieldGroup: [
                  {
                    key: 'fname',
                    type: 'input',
                    className: 'form-group col-md-4',
                    templateOptions: {
                      label: 'First name',
                      required: true,
                      type: 'text'
                    },
                  },
                  {
                    key: 'mname',
                    type: 'input',
                    className: 'form-group col-md-4',
                    templateOptions: {
                      label: 'Middle name',
                      required: true,
                      type: 'range'
                    },
                  },
                  {
                    key: 'age',
                    type: 'input',
                    className: 'form-group col-md-4',
                    templateOptions: {
                      label: 'Age',
                      required: true,
                      type: 'number'
                    },
                  },
                ]
              }
        ];
        return x;
      }
    });
  }

  async getTest(id) {
    const test =  await this.service.getFormById(id).toPromise();
    return (test as any).data.json;
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
    parent.fieldGroup = parent.fieldGroup.filter( x => {
      return x.id !== field.id;
    });
  }

  private insertRow(field) {
    field.fieldGroup = [
      ...(field.fieldGroup || []),
      this.service.clone(CONSTANT.newRow)
    ];
  }

  private deleteRow(field) {
    field.parent.fieldGroup = [];
    this.fields = this.fields.filter( x => {
      return x.id !== field.parent.id;
    });
  }

  private duplicate(what: 'column' | 'row', field) {
    if (what === 'column') {
      const duplidateColumn = this.service.clone(field);
      const stamp = Math.floor(Date.now() / 1000);
      if ('formly-group' === duplidateColumn.type) {
        delete duplidateColumn.key;
      }

      delete duplidateColumn.id;
      this.deleteFieldGroupMembersID(duplidateColumn);
      this.addColumn('next', field, duplidateColumn);

    } else {
      const duplidateRow = this.service.clone(field.parent);
      delete duplidateRow.id;
      duplidateRow.fieldGroup = duplidateRow.fieldGroup.map( x => {
        const stamp = Math.floor(Date.now() / 1000);
        x.key = `${x.key || ''}_${stamp}`;
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
    this.form = new FormGroup({});
    this.model = {};
    const cloneFields = this.service.clone(this.fields);
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
    this.fields = cloneFields;
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
    this.form = new FormGroup({});
    this.model = {};
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
