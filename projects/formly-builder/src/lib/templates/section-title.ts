import { Component, OnInit, HostListener } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyBuilderService } from '../formly-builder.service';

@Component({
 selector: 'jk-section-title',
 template: `

  <h1 class="formx__template formx__template--section-title">{{to.label}}</h1>

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
export class SectionTitleComponent extends FieldType {}
