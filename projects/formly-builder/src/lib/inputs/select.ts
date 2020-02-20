import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-select',
 template: `
    <label
      [ngClass]="{'formx__label--required': to.required}"
      class="formx__label"
      *ngIf="to.label">
      {{to.label}}
    </label>

    <select
      [ngClass]="{ 'formx__field--invalid': showError}"
      class="formx__field" [formControl]="formControl" [formlyAttributes]="field">
      <option [value]="o.id" *ngFor="let o of to.options">
        {{o.label}}
      </option>
    </select>

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
export class SelectComponent extends FieldType {

  constructor(
    private srv: FormlyBuilderService
  ) {
    super();
  }
}
