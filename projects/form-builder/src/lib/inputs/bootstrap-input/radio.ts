import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'jk-radio',
 template: `
  <!-- add class form-check-inline for inline-->
  <label>{{to.label}}</label>
  <div class="form-check" *ngFor="let o of to.options">
    <input [id]="o.id" class="form-check-input" type="radio" [value]="o.id" [formControl]="formControl">
    <label [for]="o.id" class="form-check-label">
      {{o.label}}
    </label>
  </div>

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
   `
 ]
})
export class RadioComponent extends FieldType {}
