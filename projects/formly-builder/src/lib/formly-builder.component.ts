import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { FormlyBuilderService } from './formly-builder.service';
import { Subscription } from 'rxjs';
import { FormlyEvent, FormlyAction } from './interface/formly-event.interface';

@Component({
  selector: 'jk-formly-builder',
  templateUrl: 'formly-builder.component.html',
  styleUrls: ['formly-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormlyBuilderComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() model: any;
  @Input() options: FormlyFormOptions;
  @Input() fields: FormlyFieldConfig[];
  @Input() editable = true;

  show = true;

  private subs: Subscription[];

  constructor(
    private srv: FormlyBuilderService
  ) { }

  ngOnInit() {
    FormlyBuilderService.editable = this.editable;
    this.subs = [
      this.watchEvents(),
    ];
  }

  private watchEvents() {
    return this.srv.events.subscribe( (x: FormlyEvent) => {
      if (x.action === FormlyAction.UPDATE_INPUT) {
        this.reload();
      }
    });
  }

  private reload() {
    this.show = false;
    setTimeout( x => {
      this.show = true;
    });
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
