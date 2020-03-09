import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ng-jk-editor-layout-tab',
  templateUrl: './editor-layout-tab.component.html',
  styleUrls: ['./editor-layout-tab.component.scss']
})
export class EditorLayoutTabComponent implements OnInit {

  @Input() form: FormGroup;
  columns = new Array(12);
  // constructor() { }

  ngOnInit() {
    //
  }

}
