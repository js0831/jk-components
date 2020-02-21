import { NgModule } from '@angular/core';
import { FormlyBuilderComponent } from './formly-builder.component';
import { FormlyModule, FieldType } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './inputs/input.text';
import { CommonModule } from '@angular/common';
import { InputTextAreaComponent } from './inputs/input.textarea';
import { UpdatorComponent } from './components/updator/updator.component';
import { EmptyComponent } from './inputs/empty';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { SelectComponent } from './inputs/select';
import { OptionsTabComponent } from './components/updator/tabs/options-tab/options-tab.component';
import { ValidationsTabComponent } from './components/updator/tabs/validations-tab/validations-tab.component';
import { LayoutTabComponent } from './components/updator/tabs/layout-tab/layout-tab.component';
import { MainTabComponent } from './components/updator/tabs/main-tab/main-tab.component';
import { InputRadioComponent } from './inputs/input.radio';
import { InputCheckboxMultipleComponent } from './inputs/input.checkbox-multiple';
import { InputCheckboxComponent } from './inputs/input.checkbox';
import { InputDateComponent } from './inputs/input.date';
import { InputEmailComponent } from './inputs/input.email';
import { InputTimeComponent } from './inputs/input.time';
import { InputNumberComponent } from './inputs/input.number';
import { InputPasswordComponent } from './inputs/input.password';
import { SectionTitleComponent } from './templates/section-title';

// import { RowWrapperComponent } from './wrappers/row.wrapper';

@NgModule({
  declarations: [
    FormlyBuilderComponent,
    UpdatorComponent,

    // INPUT TYPES
    InputTextComponent,
    InputDateComponent,
    InputEmailComponent,
    InputTimeComponent,
    InputNumberComponent,
    InputNumberComponent,
    InputPasswordComponent,
    InputTextAreaComponent,
    EmptyComponent,
    SelectComponent,
    InputRadioComponent,
    InputCheckboxComponent,
    InputCheckboxMultipleComponent,

    // TEMPLATES
    SectionTitleComponent,

    ActionButtonsComponent,
    OptionsTabComponent,
    ValidationsTabComponent,
    LayoutTabComponent,
    MainTabComponent,

    // WRAPPERS
    // RowWrapperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'empty', component: EmptyComponent },
        { name: 'input-text', component: InputTextComponent },
        { name: 'input-date', component: InputDateComponent },
        { name: 'input-email', component: InputEmailComponent },
        { name: 'input-number', component: InputNumberComponent },
        { name: 'input-password', component: InputPasswordComponent },
        { name: 'input-time', component: InputTimeComponent },
        { name: 'input-textarea', component: InputTextAreaComponent },
        { name: 'input-radio', component: InputRadioComponent },
        { name: 'input-checkbox', component: InputCheckboxComponent },
        { name: 'input-checkbox-multiple', component: InputCheckboxMultipleComponent },
        { name: 'select', component: SelectComponent },

        { name: 'section-title', component: SectionTitleComponent },
      ],
      wrappers: [
        // { name: 'row', component: RowWrapperComponent },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    })
  ],
  exports: [FormlyBuilderComponent]
})
export class FormlyBuilderModule { }
