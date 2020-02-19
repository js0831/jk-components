export enum FormlyAction {
  EDIT_INPUT,
  UPDATE_INPUT,
  DELETE_INPUT,
  DELETE_ROW,
  ADD_COLUMN_NEXT,
  ADD_COLUMN_PREVIOUS,
  ADD_ROW_ABOVE,
  ADD_ROW_BELOW
}

export interface FormlyEvent {
  action: FormlyAction;
  data?: any;
}
