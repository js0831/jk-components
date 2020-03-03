import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilderService } from '../../form-builder.service';
import { CONSTANT } from '../../interface/constant';
import { FormBuilderAction } from '../../interface/form-builder.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jk-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss']
})
export class FormActionsComponent implements OnInit, OnDestroy {

  formActions = CONSTANT.formActions;
  selectedAction: any;
  field: any;
  subs: Subscription[];

  constructor(
    private service: FormBuilderService
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
      }
    });
  }

  close() {
    this.service.dispatchAction(FormBuilderAction.EDIT_FORM, {
      value: false,
      data: null
    });
  }

  selectAction(action) {
    this.selectedAction = action;
  }

  apply() {
    if (!this.selectedAction) {return; }

    this.service.dispatchAction(FormBuilderAction.APPLY_FORM_ACTION, {
      field: this.field,
      action: this.selectedAction.id
    });
  }

  ngOnDestroy() {
    this.subs.forEach( x =>  x.unsubscribe());
  }
}
