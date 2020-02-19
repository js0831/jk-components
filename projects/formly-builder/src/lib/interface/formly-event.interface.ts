export enum FormlyAction {
  SELECT_INPUT,
  UPDATE_INPUT
}

export interface FormlyEvent {
  action: FormlyAction;
  data?: any;
}
