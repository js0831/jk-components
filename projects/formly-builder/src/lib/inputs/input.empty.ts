import { Component, OnInit, HostListener } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-input-empty',
 template: `
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

  @HostListener('click') onClick() {
    if (!FormlyBuilderService.editable) {return; }

    this.srv.selectInput({
      input: this.field,
      template: this.to
    });
  }
}
