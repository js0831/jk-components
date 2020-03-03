import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FormBuilderEvent } from './interface/form-builder-event.interface';
import { FormBuilderAction } from './interface/form-builder.actions';
import { CONSTANT } from './interface/constant';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private pevent: BehaviorSubject<FormBuilderEvent> = new BehaviorSubject<FormBuilderEvent>({
    action: FormBuilderAction.INIT
  });

  constructor(
    private http: HttpClient
  ) { }

  dispatchAction(action: FormBuilderAction, data?: any) {
    this.pevent.next({
      action,
      data,
    });
  }

  get events(): Observable<FormBuilderEvent> {
    return new Observable( a => {
      this.pevent.subscribe( b => {
        a.next(b);
      });
    });
  }

  getFormById(id): Observable<any> {
    return this.http.get('http://localhost:3000/form/' + id);
  }

  isWith(what, type) {
    return CONSTANT.with[what].indexOf(type) >= 0;
  }
}
