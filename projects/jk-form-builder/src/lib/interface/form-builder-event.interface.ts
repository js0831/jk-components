import { FormBuilderAction } from './form-builder.actions';

export interface FormBuilderEvent {
  action: FormBuilderAction;
  data?: any;
}
