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
    return this.http.get('https://app-form-builder-poc-api.herokuapp.com/form/' + id);
  }

  isWith(what, type) {
    return CONSTANT.with[what].indexOf(type) >= 0;
  }

  isWithout(what, type) {
    return CONSTANT.without[what].indexOf(type) >= 0;
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
    return ids;
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

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  async loadForms(fields) {
    const all = fields.map( async (x) => {

      if (x.type !== 'form') {
        if (x.fieldGroup && x.fieldGroup.length > 0) {
          x.fieldGroup = await this.loadForms(x.fieldGroup);
          return x;
        } else {
          return x;
        }
      } else {
        const formJson = await this.getFormSchema(x.templateOptions.id);
        formJson[0].className =  x.className;
        return formJson[0];
      }
    });
    return Promise.all(all);
  }

  async getFormSchema(id) {
    const test =  await this.getFormById(id).toPromise();
    return (test as any).data.json;
  }
}
