import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'jk-layout-tab',
  templateUrl: './layout-tab.component.html',
  styleUrls: ['./layout-tab.component.css']
})
export class LayoutTabComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {

  }

}
