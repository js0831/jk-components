import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { FormActionsComponent } from './components/form-actions/form-actions.component';
import { EditorLayoutTabComponent } from './components/editor/components/editor-layout-tab/editor-layout-tab.component';
import { EditorValidationTabComponent } from './components/editor/components/editor-validation-tab/editor-validation-tab.component';
import { FormBuilderConfig } from './config/form-builder.config';
import { FormBuilderConfigService } from './config/form-builder-config.service';
import { FormBuilderService } from './form-builder.service';



@NgModule({
  declarations: [
    FormBuilderComponent,
    EditorComponent,
    EditorTabsComponent,
    EditorMainTabComponent,
    EditorOptionsTabComponent,
    FormActionsComponent,
    EditorLayoutTabComponent,
    EditorValidationTabComponent
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
export class FormBuilderModule {
  static forRoot(config: FormBuilderConfig): ModuleWithProviders {
    return {
      ngModule: FormBuilderModule,
      providers: [
        FormBuilderService,
        {
          provide: FormBuilderConfigService,
          useValue: config
        }
      ]
    };
  }
}
