import { JkFormBuilderAction } from './jk-form-builder.actions';

export interface JkFormBuilderEvent {
  action: JkFormBuilderAction;
  data?: any;
}
