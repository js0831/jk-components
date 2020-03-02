import { NgModule } from '@angular/core';
import { FormBuilderComponent } from './form-builder.component';
import { BootstrapInputModule } from './inputs/bootstrap-input/bootstrap-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './components/editor/editor.component';
import { EditorTabsComponent } from './components/editor/components/editor-tabs/editor-tabs.component';
import { EditorMainTabComponent } from './components/editor/components/editor-main-tab/editor-main-tab.component';
import { EditorOptionsTabComponent } from './components/editor/components/editor-options-tab/editor-options-tab.component';



@NgModule({
  declarations: [
    FormBuilderComponent,
    EditorComponent,
    EditorTabsComponent,
    EditorMainTabComponent,
    EditorOptionsTabComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    HttpClientModule,
    BootstrapInputModule
  ],
  exports: [
    FormBuilderComponent,
  ]
})
export class FormBuilderModule { }
