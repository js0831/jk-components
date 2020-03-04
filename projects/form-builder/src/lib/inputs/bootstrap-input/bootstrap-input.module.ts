import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormSectionWrapperComponent } from './wrappers/form-section.wrapper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectComponent } from './select';
import { InputComponent } from './input';
import { CheckboxComponent } from './checkbox';
import { CheckboxesComponent } from './checkboxes';
import { RadioComponent } from './radio';
import { TextareaComponent } from './textarea';
import { BlankComponent } from './blank';
import { FormComponent } from './form';
import { EditInputButtonComponent } from '../../components/edit-input-button/edit-input-button.component';
import { SelectMultipleComponent } from './select-multiple';


export function minlengthValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}

export function patternValidationMessage(err, field) {
  return `Is not a valid pattern`;
}

@NgModule({
  declarations: [
    EditInputButtonComponent,

    InputComponent,
    TextareaComponent,
    SelectComponent,
    SelectMultipleComponent,
    CheckboxComponent,
    CheckboxesComponent,
    RadioComponent,
    BlankComponent,
    FormComponent,

    FormSectionWrapperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'input', component: InputComponent },
        { name: 'textarea', component: TextareaComponent },
        { name: 'select', component: SelectComponent },
        { name: 'select_multiple', component: SelectMultipleComponent },
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
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'pattern', message: patternValidationMessage },
      ],
    })
  ]
})
export class BootstrapInputModule { }
