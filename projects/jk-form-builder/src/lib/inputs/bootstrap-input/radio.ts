import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'ng-jk-radio',
 template: `
  <!-- add class form-check-inline for inline-->
  <label *ngIf="to.label" [ngClass]="{'required': to.required}">{{to.label}}</label>
  <div class="form-check" *ngFor="let o of to.options">
    <input [id]="o.id" [name]="field.key" class="form-check-input" type="radio" [value]="o.id" [formControl]="formControl">
    <label [for]="o.id" class="form-check-label">
      {{o.label}}
    </label>
  </div>

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

    :host > label{
      display:block;
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
export class RadioComponent extends FieldType {}
