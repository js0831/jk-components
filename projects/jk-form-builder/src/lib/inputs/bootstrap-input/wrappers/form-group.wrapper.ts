import { Component} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
selector: 'ng-jk-form-group-wrapper',
template: `
  <div class="card">
    <div class="card-header">
      {{to.label}}

      <ng-jk-edit-input-button
        [field]="field" [template]="to"
      ></ng-jk-edit-input-button>
    </div>
    <div class="card-body">
      <ng-container #fieldComponent></ng-container>
    </div>
  </div>
`,
styles: [
  `
    :host{
      position:relative;
      display: block;
    }

    .card-header:hover jk-edit-input-button{
      display:block;
    }

    ng-jk-edit-input-button{
      display:none;
    }
  `
]
})
export class FormGroupWrapperComponent extends FieldWrapper {

}
