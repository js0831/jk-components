import { Injectable, EventEmitter } from '@angular/core';
import { FormlyEvent, FormlyAction } from './interface/formly-event.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormlyBuilderService {

  static editable = false;
  private pevent: EventEmitter<FormlyEvent> = new EventEmitter<FormlyEvent>();

  constructor() { }

  selectInput(data: any) {
    this.pevent.next({
      action: FormlyAction.SELECT_INPUT,
      data,
    });
  }

  saveInput() {
    this.pevent.next({
      action: FormlyAction.UPDATE_INPUT,
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
