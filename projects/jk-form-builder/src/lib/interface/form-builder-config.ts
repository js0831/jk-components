import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

export interface FormBuilderConfig {
  form: FormGroup;
  model: any;
  fields: FormlyFieldConfig[];
  options?: FormlyFormOptions;
}
