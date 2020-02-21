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

  saveInput(path, field) {
    this.pevent.next({
      action: FormlyAction.UPDATE_INPUT,
      data: {
        path,
        field
      }
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

  getInputOriginPath(field) {
    let ids = [field.id];
    if (field.parent && field.parent.id) {
      const parentId = this.getInputOriginPath(field.parent);
      ids = [
        ...ids,
        ...parentId
      ];
    }
    return ids.reverse();
  }

  getFieldByPath(path, fields) {
    let fieldHolder = fields;
    path.forEach( (x, i) => {
      const field = this.getFieldById(x, fieldHolder);
      fieldHolder = path.length === (i + 1) ? field : (field.fieldGroup || field);
    });
    return fieldHolder;
  }

  getFieldById(id, fields) {
    return fields.filter( x => {
      return x.id === id;
    })[0];
  }
}
