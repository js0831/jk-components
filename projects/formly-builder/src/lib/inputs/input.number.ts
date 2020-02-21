import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'jk-input-number',
 template: `
    <label
      [ngClass]="{'formx__label--required': to.required }"
      class="formx__label"
      *ngIf="to.label">
      {{to.label}}
    </label>

    <input
      [ngClass]="{ 'formx__field--invalid': showError}"
      class="formx__field formx__field--number" type="number" [formControl]="formControl" [formlyAttributes]="field">

    <formly-validation-message *ngIf="showError" [field]="field"></formly-validation-message>

    <jk-action-buttons
      [field]="field"
      [template]="to"
    ></jk-action-buttons>
 `,
 styles: [
   `
   `
 ]
})
export class InputNumberComponent extends FieldType {}
