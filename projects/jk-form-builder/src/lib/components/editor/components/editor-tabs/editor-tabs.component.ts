import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { JkFormBuilderService } from 'projects/jk-form-builder/src/lib/jk-form-builder.service';
import { Subscription } from 'rxjs';
import { JkFormBuilderAction } from 'projects/jk-form-builder/src/lib/interface/jk-form-builder.actions';

@Component({
  selector: 'ng-jk-editor-tabs',
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
    private service: JkFormBuilderService
  ) {

  }

  ngOnInit() {
    this.subs = [
      this.watchInputTypeChange()
    ];
    this.appendDynamicTabs(this.field.type);
    this.selectTab(this.tabs[0]);
  }

  private watchInputTypeChange() {
    return this.service.events.subscribe( x => {
      switch (x.action) {
        case JkFormBuilderAction.INPUT_TYPE_CHANGE:
          this.appendDynamicTabs(x.data);
          break;
        default:
          break;
      }
    });
  }

  private appendDynamicTabs(type) {
    this.appendOptionsTab(type);
    this.appendLayoutTab(type);
    this.appendValidationTab(type);
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

  appendValidationTab(type) {
    this.tabs = this.tabs.filter( x => x.value !== 'validation');
    if (!this.service.isWithout('validation', type)) {
      this.tabs.push({
        label: 'Validation',
        value: 'validation'
      });
    }
  }

  ngOnDestroy() {
    this.subs.forEach( x => x.unsubscribe());
  }
}
