import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'jk-checkboxes',
 template: `
  <!-- add class form-check-inline for inline-->
  <label>{{to.label}}</label>
  <div class="form-check" *ngFor="let f of field.fieldGroup">
    <input [id]="f.id" class="form-check-input" type="checkbox" [formControl]="f.formControl">
    <label [for]="f.id" class="form-check-label">
      {{f.templateOptions.label}}
    </label>
  </div>

  <formly-validation-message class="invalid-feedback" *ngIf="showError" [field]="field"></formly-validation-message>

  <jk-edit-input-button
    [field]="field" [template]="to"
  ></jk-edit-input-button>
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
export class CheckboxesComponent extends FieldType {}
