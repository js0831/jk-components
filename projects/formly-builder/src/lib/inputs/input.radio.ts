import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-input-radio',
 template: `
    <label
      [ngClass]="{'formx__label--required': to.required}"
      class="formx__label"
      *ngIf="to.label">
      {{to.label}}
    </label>

    <div
      [ngClass]="{ 'formx__field--invalid': showError}"
      class="formx__field formx__field--radio">
      <label *ngFor="let o of to.options">
        <input type="radio" [value]="o.id" [formControl]="formControl"> <span>{{o.label}}</span>
      </label>
    </div>

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
export class InputRadioComponent extends FieldType {}
