import { NgModule } from '@angular/core';
import { FormlyBuilderComponent } from './formly-builder.component';
import { FormlyModule, FieldType } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './inputs/input.text';
import { CommonModule } from '@angular/common';
import { InputTextAreaComponent } from './inputs/input.textarea';
import { UpdatorComponent } from './components/updator/updator.component';
import { InputEmptyComponent } from './inputs/input.empty';
// import { ColumnWrapperComponent } from './wrappers/column.wrapper';

@NgModule({
  declarations: [
    FormlyBuilderComponent,
    UpdatorComponent,

    // INPUT TYPES
    InputTextComponent,
    InputTextAreaComponent,
    InputEmptyComponent,

    // WRAPPERS
    // ColumnWrapperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'input-text', component: InputTextComponent },
        { name: 'input-textarea', component: InputTextAreaComponent },
        { name: 'input-empty', component: InputEmptyComponent },
      ],
      wrappers: [
        // { name: 'column', component: ColumnWrapperComponent },
      ],
    })
  ],
  exports: [FormlyBuilderComponent]
})
export class FormlyBuilderModule { }
