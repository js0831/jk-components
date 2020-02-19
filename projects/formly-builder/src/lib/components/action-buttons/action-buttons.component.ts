import { Component, OnInit, Input } from '@angular/core';
import { FormlyBuilderService } from '../../formly-builder.service';
import { FormlyAction } from '../../interface/formly-event.interface';

@Component({
  selector: 'jk-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  @Input() field: any;
  @Input() template: any;
  showActions = false;

  actions = [
      {
        label: 'Edit',
        value: 'edit'
      },
      {
        label: 'Delete Column',
        value: 'delete_column'
      },
      {
        label: 'Delete Row',
        value: 'delete_row'
      },
      {
        label: 'Add Column next',
        value: 'add_column_next'
      },
      {
        label: 'Add Column previous',
        value: 'add_column_prev'
      },
      {
        label: 'Add Row above',
        value: 'add_row_above'
      },
      {
        label: 'Add Row below',
        value: 'add_row_below'
      },
    ];

  constructor(
    private srv: FormlyBuilderService
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.showActions = !this.showActions;
  }

  onBlur() {
    setTimeout( x => {
      this.showActions = false;
    }, 250);
  }

  do(a) {
    switch (a.value) {
      case 'edit':
        this.srv.editInput({
          input: this.field,
          template: this.template
        });
        break;
      case 'delete_column':
        this.srv.deleteInput(this.field);
        break;
      case 'delete_row':
        this.srv.deleteRow(this.field);
        break;
      case 'add_column_next':
        this.srv.doAction(FormlyAction.ADD_COLUMN_NEXT, this.field);
        break;
      case 'add_column_prev':
        this.srv.doAction(FormlyAction.ADD_COLUMN_PREVIOUS, this.field);
        break;
      case 'add_row_below':
        this.srv.doAction(FormlyAction.ADD_ROW_BELOW, this.field);
        break;
      case 'add_row_above':
        this.srv.doAction(FormlyAction.ADD_ROW_ABOVE, this.field);
        break;
      default:
        break;
    }
  }
}
