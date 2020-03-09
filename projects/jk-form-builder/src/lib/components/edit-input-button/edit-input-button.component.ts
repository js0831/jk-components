import { Component, OnInit, Input } from '@angular/core';
import { JkFormBuilderService } from '../../jk-form-builder.service';
import { FormBuilderAction } from '../../interface/form-builder.actions';

@Component({
  selector: 'ng-jk-edit-input-button',
  templateUrl: './edit-input-button.component.html',
  styleUrls: ['./edit-input-button.component.scss']
})
export class EditInputButtonComponent implements OnInit {

  @Input() field: any;
  @Input() template: any;

  constructor(
    private service: JkFormBuilderService
  ) { }

  ngOnInit() {
    //
  }

  edit(type) {
    if (type === 'field') {
      this.service.dispatchAction(FormBuilderAction.EDIT_INPUT, {
        value: true,
        data: this.field
      });
      return;
    }

    this.service.dispatchAction(FormBuilderAction.EDIT_FORM, {
      value: true,
      data: this.field
    });
  }

}
