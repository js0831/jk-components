import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilderService } from 'projects/form-builder/src/lib/form-builder.service';
import { Subscription } from 'rxjs';
import { FormBuilderAction } from 'projects/form-builder/src/lib/interface/form-builder.actions';

@Component({
  selector: 'jk-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss']
})
export class EditorTabsComponent implements OnInit, OnDestroy {

  @Input() field: any;
  @Output() onselect: EventEmitter<{label: string, value: string}> = new EventEmitter<{label: string, value: string}>();

  private subs: Subscription[];

  tabs = [
    {
      label: 'Main',
      value: 'main'
    }
  ];

  activeTab: any;

  constructor(
    private service: FormBuilderService
  ) {

  }

  ngOnInit() {
    this.subs = [
      this.watchInputTypeChange()
    ];
    this.appendOptionsTab(this.field.type);
    this.appendLayoutTab(this.field.type);
    this.selectTab(this.tabs[0]);
  }

  private watchInputTypeChange() {
    return this.service.events.subscribe( x => {
      switch (x.action) {
        case FormBuilderAction.INPUT_TYPE_CHANGE:
          this.appendOptionsTab(x.data);
          this.appendLayoutTab(x.data);
          break;
        default:
          break;
      }
    });
  }

  selectTab(tab) {
    this.activeTab = tab;
    this.onselect.emit(tab);
  }

  appendOptionsTab(type) {
    this.tabs = this.tabs.filter( x => x.value !== 'options');
    if (this.service.isWith('options', type)) {
      this.tabs.push({
        label: 'Options',
        value: 'options'
      });
    }
  }

  appendLayoutTab(type) {
    this.tabs = this.tabs.filter( x => x.value !== 'layout');
    if (!this.service.isWithout('layout', type)) {
      this.tabs.push({
        label: 'Layout',
        value: 'layout'
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
