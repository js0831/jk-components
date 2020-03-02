import { Component} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
selector: 'jk-form-section-wrapper',
template: `
  <div class="card">
    <div class="card-header">
      {{to.label}}
    </div>
    <div class="card-body">
      <ng-container #fieldComponent></ng-container>
    </div>
  </div>
`,
styles: [
  `
    :host{
      display: block;
      margin-bottom: 10px;
    }
  `
]
})
export class FormSectionWrapperComponent extends FieldWrapper {

}
