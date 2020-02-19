import { Component, OnInit, HostListener } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-input-textarea',
 template: `
    <label
      [ngClass]="{'formx__label--required': to.required}"
      class="formx__label"
      *ngIf="to.label">
      {{to.label}}
    </label>
    <textarea class="formx__field" [formControl]="formControl" [formlyAttributes]="field"></textarea>
    <jk-action-buttons
      [field]="field"
      [template]="to"
    ></jk-action-buttons>
 `,
 styles: [
   `
    textarea{
      font-size: 1.75em;
    }
   `
 ]
})
export class InputTextAreaComponent extends FieldType {

  constructor(
    private srv: FormlyBuilderService
  ) {
    super();
  }
}
