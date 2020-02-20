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
// import { RowWrapperComponent } from './wrappers/row.wrapper';

@NgModule({
  declarations: [
    FormlyBuilderComponent,
    UpdatorComponent,

    // INPUT TYPES
    InputTextComponent,
    InputTextAreaComponent,
    EmptyComponent,
    SelectComponent,

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
        { name: 'input-textarea', component: InputTextAreaComponent },
        { name: 'select', component: SelectComponent },
      ],
      wrappers: [
        // { name: 'row', component: RowWrapperComponent },
      ],
    })
  ],
  exports: [FormlyBuilderComponent]
})
export class FormlyBuilderModule { }
