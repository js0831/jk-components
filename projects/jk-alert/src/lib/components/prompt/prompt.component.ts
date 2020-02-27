import { Component, OnInit, Input } from '@angular/core';
import { PrompType } from './prompt-type.enum';
import { PromptDataInterface } from './promp-data.interface';

@Component({
  selector: 'ng-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  @Input() type: PrompType;
  @Input() data: PromptDataInterface;

  promptType = PrompType;

  constructor() { }

  ngOnInit() {

  }

}
