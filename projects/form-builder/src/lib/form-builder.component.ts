import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormBuilderService } from './form-builder.service';
import { Subscription } from 'rxjs';
import { FormBuilderAction } from './interface/form-builder.actions';

@Component({
  selector: 'jk-form-builder',
  template: `
    <jk-editor *ngIf="isEdit"></jk-editor>

    <formly-form
      *ngIf="show"
      [model]="model"
      [fields]="fields"
      [form]="form">
    </formly-form>

    <!-- <pre>{{model | json}}</pre> -->
  `,
  styles: []
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  subs: Subscription[];
  isEdit = false;
  show = true;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      wrappers: ['form-section'],
      templateOptions: {
        label: 'Default Form Title'
      },
      fieldGroup: [
        {
          wrappers: ['form-section'],
          templateOptions: {
            label: 'Default Form Title'
          },
        },
      ]
    },
    {
      wrappers: ['form-section'],
      key: 'default',
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
              },
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
              type: 'blank',
              className: 'form-group col-md-4',
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
        }
      ]
    }
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
        x.wrappers = ['form-section'];
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
          this.reloadForm();
          break;
        default:
          break;
      }
    });
  }

  private reloadForm() {
    this.show = false;
    this.form = new FormGroup({});
    this.model = {};
    setTimeout( () => {
      this.show = true;
    });
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
