import { Component, OnInit, HostListener } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-input-empty',
 template: `
  <jk-action-buttons
      [field]="field"
      [template]="to"
    ></jk-action-buttons>
 `,
 styles: [
   `
    :host{
      width: 100%;
      height: 100%;
    }
   `
 ]
})
export class InputEmptyComponent extends FieldType {

  constructor(
    private srv: FormlyBuilderService
  ) {
    super();
  }
}
