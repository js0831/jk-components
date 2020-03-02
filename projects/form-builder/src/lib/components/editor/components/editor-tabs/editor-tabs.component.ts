import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jk-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss']
})
export class EditorTabsComponent implements OnInit {

  @Output() onselect: EventEmitter<{label: string, value: string}> = new EventEmitter<{label: string, value: string}>();

  tabs = [
    {
      label: 'Main',
      value: 'main'
    },
    {
      label: 'Options',
      value: 'options'
    }
  ];

  activeTab: any;


  ngOnInit() {
    this.selectTab(this.tabs[0]);
  }

  selectTab(tab) {
    this.activeTab = tab;
    this.onselect.emit(tab);
  }
}
