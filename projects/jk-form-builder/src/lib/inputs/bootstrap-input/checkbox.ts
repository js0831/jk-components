import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'ng-jk-checkbox',
 template: `
  <div class="form-check">
    <input [id]="field.id" class="form-check-input" type="checkbox" [formControl]="formControl">
    <label [for]="field.id" class="form-check-label">
      {{to.label}}
    </label>
  </div>
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

    :host:hover jk-edit-input-button{
      display:block;
    }

    jk-edit-input-button{
      display:none;
    }
   `
 ]
})
export class CheckboxComponent extends FieldType {}
