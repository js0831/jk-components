import { Component, OnInit, HostListener } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-input-text',
 template: `
    <label
      [ngClass]="{'formx__label--required': to.required}"
      class="formx__label"
      *ngIf="to.label">
      {{to.label}}
    </label>
    <input class="formx__field" type="input" [formControl]="formControl" [formlyAttributes]="field">
 `,
 styles: [
   `
   `
 ]
})
export class InputTextComponent extends FieldType {

  constructor(
    private srv: FormlyBuilderService
  ) {
    super();
  }

  @HostListener('click') onClick() {
    if (!FormlyBuilderService.editable) {return; }
    // console.log(this);
    this.srv.selectInput({
      input: this.field,
      template: this.to
    });
  }
}
