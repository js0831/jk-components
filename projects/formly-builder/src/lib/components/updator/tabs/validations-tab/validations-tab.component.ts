import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'jk-validations-tab',
  templateUrl: './validations-tab.component.html',
  styleUrls: ['./validations-tab.component.css']
})
export class ValidationsTabComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
