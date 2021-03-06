import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'ng-jk-select-multiple',
 template: `
    <label *ngIf="to.label" [ngClass]="{'required': to.required}">{{to.label}}</label>
    <select
      multiple="true"
      class="form-control form-control-sm"
      [formControl]="formControl" [formlyAttributes]="field">
      <option [value]="o.id" *ngFor="let o of to.options">
        {{o.label}}
      </option>
    </select>

    <formly-validation-message class="invalid-feedback" *ngIf="showError" [field]="field"></formly-validation-message>

    <ng-jk-edit-input-button
      [field]="field" [template]="to"
    ></ng-jk-edit-input-button>
 `,
 styles: [
   `
    :host{
      position:relative;
      display: block;
    }

    :host:hover{
      box-shadow: 0 0 0px 3px rgba(99, 255, 60, 0.4);
      background: rgba(99, 255, 60, 0.4);
    }

    :host:hover ng-jk-edit-input-button{
      display:block;
    }

    ng-jk-edit-input-button{
      display:none;
    }

    .invalid-feedback{
      display:block;
    }
   `
 ]
})
export class SelectMultipleComponent extends FieldType {}
