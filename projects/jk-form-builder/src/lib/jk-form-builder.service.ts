import { Injectable, EventEmitter, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { JkFormBuilderEvent } from './interface/jk-form-builder-event.interface';
import { JkFormBuilderAction } from './interface/jk-form-builder.actions';
import { CONSTANT } from './interface/jk-constant';
import { JkFormTypeSelectionInterface } from './interface/jk-form-type-selection.interface';
import { FormBuilderConfigService } from './config/form-builder-config.service';
import { FormBuilderConfig } from './config/form-builder.config';

@Injectable({
  providedIn: 'root'
})
export class JkFormBuilderService {

  private formsOptions: JkFormTypeSelectionInterface[];

  private pevent: BehaviorSubject<JkFormBuilderEvent> = new BehaviorSubject<JkFormBuilderEvent>({
    action: JkFormBuilderAction.INIT
  });

  constructor(
    private http: HttpClient,
    @Inject(FormBuilderConfigService) private config: FormBuilderConfig,
  ) { }

  dispatchAction(action: JkFormBuilderAction, data?: any) {
    this.pevent.next({
      action,
      data,
    });
  }

  get events(): Observable<JkFormBuilderEvent> {
    return new Observable( a => {
      this.pevent.subscribe( b => {
        a.next(b);
      });
    });
  }

  getFormById(id): Observable<any> {
    // https://app-form-builder-poc-api.herokuapp.com/form/
    return this.http.get(this.config.apiURL + id);
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

  setFormsSelectionOptions(options: JkFormTypeSelectionInterface[]) {
    this.formsOptions = options;
  }

  get formSelectionOptions(): JkFormTypeSelectionInterface[] {
    return this.formsOptions || [];
  }

  getFieldOrigin(field) {
    if (field.parent) {
      return this.getFieldOrigin(field.parent);
    } else {
      return field;
    }
  }

  getAllFieldKeys(fields): { key: string, id: string }[] {
    let keys = [];
    fields.forEach( x => {
      if (x.key) {
        keys.push({
          key: x.key,
          id: x.id
        });
      }
      if (x.fieldGroup && x.fieldGroup.length > 0) {
        const childKeys = this.getAllFieldKeys(x.fieldGroup);
        keys = [
          ...keys,
          ...childKeys
        ];
      }
    });

    return keys;
  }
}
