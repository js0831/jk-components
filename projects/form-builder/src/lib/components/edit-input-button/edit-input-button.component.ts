import { Component, OnInit, Input } from '@angular/core';
import { FormBuilderService } from '../../form-builder.service';
import { FormBuilderAction } from '../../interface/form-builder.actions';

@Component({
  selector: 'jk-edit-input-button',
  templateUrl: './edit-input-button.component.html',
  styleUrls: ['./edit-input-button.component.scss']
})
export class EditInputButtonComponent implements OnInit {

  @Input() field: any;
  @Input() template: any;

  constructor(
    private service: FormBuilderService
  ) { }

  ngOnInit() {
  }

  edit() {
    this.service.dispatchAction(FormBuilderAction.EDIT_INPUT, {
      value: true,
      data: {
        field: this.field,
        template: this.template
      }
    });
  }

}
