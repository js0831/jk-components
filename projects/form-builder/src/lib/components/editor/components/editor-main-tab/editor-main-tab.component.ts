import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CONSTANT } from 'projects/form-builder/src/lib/interface/constant';
import { FormBuilderService } from 'projects/form-builder/src/lib/form-builder.service';
import { FormBuilderAction } from 'projects/form-builder/src/lib/interface/form-builder.actions';


@Component({
  selector: 'jk-editor-main-tab',
  templateUrl: './editor-main-tab.component.html',
  styleUrls: ['./editor-main-tab.component.scss']
})
export class EditorMainTabComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  private subs: Subscription[];

  inputTypes = CONSTANT.inputTypes;

  constructor(
    private service: FormBuilderService
  ) {
    //
  }

  ngOnInit() {
    this.subs = [
      this.watchFieldTypeOnChange()
    ];
  }

  private watchFieldTypeOnChange() {
    const type = this.form.get('type');
    return type.statusChanges.subscribe( x => {
      this.service.dispatchAction(FormBuilderAction.INPUT_TYPE_CHANGE, type.value);
    });
  }

  isWithDefaultValue() {
    return !this.service.isWithout('defaultValue', this.form.value.type);
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
