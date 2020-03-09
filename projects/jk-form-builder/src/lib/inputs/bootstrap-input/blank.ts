import { Component, OnInit, Host } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'ng-jk-blank',
 template: `


  <ng-jk-edit-input-button
    [field]="field" [template]="to"
  ></ng-jk-edit-input-button>
 `,
 styles: [
   `
    :host{
      position:relative;
      display: block;
      height: 63px;
      width: 100%;
      border: 1px dashed #ddd;
      transition: all .25s ease;
    }

    :host:hover{
      box-shadow: 0 0 0px 3px rgba(99, 255, 60, 0.4);
      background: rgba(99, 255, 60, 0.4);
      border-color: transparent;
    }

    :host:hover jk-edit-input-button{
      display:block;
    }

    jk-edit-input-button{
      display:none;
    }
   `
 ]
})
export class BlankComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    //
  }
}
