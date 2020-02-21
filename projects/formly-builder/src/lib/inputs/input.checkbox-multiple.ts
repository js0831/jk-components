import { Component, OnInit, HostListener, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-input-checkbox-multiple',
 template: `
    <label
      [ngClass]="{'formx__label--required': to.required}"
      class="formx__label"
      *ngIf="to.label">
      {{to.label}}
    </label>

    <div
      [ngClass]="{ 'formx__field--invalid': showError}"
      class="formx__field formx__field--checkbox-multiple">
      <label *ngFor="let f of field.fieldGroup">
        <input type="checkbox" [formControl]="f.formControl"> <span>{{f.templateOptions.label}}</span>
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
export class InputCheckboxMultipleComponent extends FieldType implements OnInit {

  ngOnInit() {
  }
}
