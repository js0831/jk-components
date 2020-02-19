import { Injectable, EventEmitter } from '@angular/core';
import { FormlyEvent, FormlyAction } from './interface/formly-event.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormlyBuilderService {

  static editable = false;
  static lastSelectedRowIndex = null;
  private pevent: EventEmitter<FormlyEvent> = new EventEmitter<FormlyEvent>();

  constructor() { }

  editInput(data: any) {
    this.pevent.next({
      action: FormlyAction.EDIT_INPUT,
      data,
    });
  }

  deleteInput(data: any) {
    this.pevent.next({
      action: FormlyAction.DELETE_INPUT,
      data,
    });
  }

  deleteRow(data: any) {
    this.pevent.next({
      action: FormlyAction.DELETE_ROW,
      data,
    });
  }

  saveInput() {
    this.pevent.next({
      action: FormlyAction.UPDATE_INPUT,
    });
  }

  doAction(action: FormlyAction, data?: any) {
    this.pevent.next({
      action,
      data,
    });
  }

  get events() {
    return new Observable( a => {
      this.pevent.subscribe( b => {
        a.next(b);
      });
    });
  }
}
