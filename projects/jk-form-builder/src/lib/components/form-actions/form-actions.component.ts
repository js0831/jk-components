import { Component, OnInit, OnDestroy } from '@angular/core';
import { JkFormBuilderService } from '../../jk-form-builder.service';
import { CONSTANT } from '../../interface/jk-constant';
import { JkFormBuilderAction } from '../../interface/jk-form-builder.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ng-jk-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss']
})
export class FormActionsComponent implements OnInit, OnDestroy {

  formActions = this.service.clone(CONSTANT.formActions);
  selectedAction: any;
  field: any;
  subs: Subscription[];

  constructor(
    private service: JkFormBuilderService
  ) {
  }

  ngOnInit() {
    this.subs = [
      this.watchEvents()
    ];
  }

  private watchEvents() {
    return this.service.events.subscribe( x => {
      if (x.data && x.data.data) {
        this.field = x.data.data;
        this.appendAdditionalActions();
      }
    });
  }

  private appendAdditionalActions() {
    if (this.service.isWith('additionalFormAction', this.field.type)) {
      this.formActions.push({
        label: 'Insert Row',
        id: 'insert_row'
      });
    }
  }

  close() {
    this.service.dispatchAction(JkFormBuilderAction.EDIT_FORM, {
      value: false,
      data: null
    });
  }

  selectAction(action) {
    this.selectedAction = action;
  }

  apply() {
    if (!this.selectedAction) {return; }

    this.service.dispatchAction(JkFormBuilderAction.APPLY_FORM_ACTION, {
      field: this.field,
      action: this.selectedAction.id
    });
  }

  ngOnDestroy() {
    this.subs.forEach( x =>  x.unsubscribe());
  }
}
