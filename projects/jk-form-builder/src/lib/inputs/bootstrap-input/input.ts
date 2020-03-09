import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'ng-jk-input',
 template: `
    <!-- ADD col-sm-4 to label for inline -->
    <!-- ADD col-sm-8 to input for inline -->
    <label *ngIf="to.label" [ngClass]="{'required': to.required}">{{to.label}}</label>
    <input
      [type]="to.type"
      class="form-control form-control-sm"
      [formControl]="formControl"
      [formlyAttributes]="field"
    >

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
      /* flex for inline */
    }

    :host:hover{
      box-shadow: 0 0 0px 3px rgba(99, 255, 60, 0.4);
      background: rgba(99, 255, 60, 0.4);
    }

    :host:hover jk-edit-input-button{
      display:block;
    }

    jk-edit-input-button{
      display:none;
    }

    .invalid-feedback{
      display:block;
    }
   `
 ]
})
export class InputComponent extends FieldType {}
