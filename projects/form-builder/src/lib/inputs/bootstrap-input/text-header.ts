import { Component, OnInit, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'jk-text-header',
 template: `

  <h4>{{to.label}}</h4>

  <jk-edit-input-button
    [field]="field" [template]="to"
  ></jk-edit-input-button>
 `,
 styles: [
   `
    :host{
      position:relative;
      display: block;
    }

    :host:hover{
      box-shadow: 0 0 0px 3px rgba(99, 255, 60, 0.4);
      background: rgba(99, 255, 60, 0.4);
    }

    :host:hover jk-edit-input-button{
      display:block;
    }

    jk-edit-input-button{
      display:none;
    }

    h4{
      margin:0;
    }
   `
 ]
})
export class TextHeaderComponent extends FieldType {}
