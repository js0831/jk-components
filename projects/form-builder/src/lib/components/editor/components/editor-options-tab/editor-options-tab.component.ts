import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'jk-editor-options-tab',
  templateUrl: './editor-options-tab.component.html',
  styleUrls: ['./editor-options-tab.component.scss']
})
export class EditorOptionsTabComponent implements OnInit {

  @Input() form: FormGroup;

  // constructor() { }

  ngOnInit() {
    //
  }

}
