import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

export interface JkFormBuilderConfig {
  form: FormGroup;
  model: any;
  fields: FormlyFieldConfig[];
  options?: FormlyFormOptions;
}
