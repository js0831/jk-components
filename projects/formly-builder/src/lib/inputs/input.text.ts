import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-input-text',
 template: `
    <label
      [ngClass]="{'formx__label--required': to.required }"
      class="formx__label"
      *ngIf="to.label">
      {{to.label}}
    </label>

    <input
      [ngClass]="{ 'formx__field--invalid': showError}"
      class="formx__field formx__field--text" type="input" [formControl]="formControl" [formlyAttributes]="field">

    <formly-validation-message
      [ngClass]="{'no-label' : !to.label || to.label.length === 0}"
      *ngIf="showError" [field]="field"></formly-validation-message>

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
export class InputTextComponent extends FieldType {}
