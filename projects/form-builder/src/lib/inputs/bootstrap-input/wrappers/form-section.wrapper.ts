import { Component} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
selector: 'jk-form-section-wrapper',
template: `
  <div class="card">
    <div class="card-header">
      {{to.label}}

      <jk-edit-input-button
        [field]="field" [template]="to"
      ></jk-edit-input-button>
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

    jk-edit-input-button{
      display:none;
    }
  `
]
})
export class FormSectionWrapperComponent extends FieldWrapper {

}
