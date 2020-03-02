import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormSectionWrapperComponent } from './wrappers/form-section.wrapper';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select';
import { InputComponent } from './input';
import { CheckboxComponent } from './checkbox';
import { CheckboxesComponent } from './checkboxes';
import { RadioComponent } from './radio';
import { TextareaComponent } from './textarea';
import { BlankComponent } from './blank';
import { FormComponent } from './form';
import { EditInputButtonComponent } from '../../components/edit-input-button/edit-input-button.component';



@NgModule({
  declarations: [
    EditInputButtonComponent,

    InputComponent,
    TextareaComponent,
    SelectComponent,
    CheckboxComponent,
    CheckboxesComponent,
    RadioComponent,
    BlankComponent,
    FormComponent,

    FormSectionWrapperComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'input', component: InputComponent },
        { name: 'textarea', component: TextareaComponent },
        { name: 'select', component: SelectComponent },
        { name: 'radio', component: RadioComponent },
        { name: 'checkbox', component: CheckboxComponent },
        { name: 'checkboxes', component: CheckboxesComponent },
        { name: 'blank', component: BlankComponent },
        { name: 'form', component: FormComponent },
      ],
      wrappers: [
        { name: 'form-section', component: FormSectionWrapperComponent },
      ],
      validationMessages: [
      ],
    })
  ]
})
export class BootstrapInputModule { }
