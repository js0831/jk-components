import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { JkWaitService } from './jk-wait.service';
import { Subscription } from 'rxjs';
import { WaitConfigService } from './config/wait-config.service';
import { WaitConfig } from './config/wait.config';

@Component({
  selector: 'ng-jk-wait',
  templateUrl: 'jk-wait.component.html',
  styleUrls: [
    'jk-wait.component.scss'
  ]
})
export class JkWaitComponent implements OnInit, OnDestroy {

  show = false;
  subs: Subscription;
  configData: WaitConfig = {
    text: 'Please Wait',
    type: 'TEXT',
    color: {
      text: '#fff',
      spinner: '#fff',
      overlay: 'rgba(51, 51, 51, 0.8)'
    }
  };

  isTextType = false;
  isSpinnerType = false;

  constructor(
    @Inject(WaitConfigService) private config: WaitConfig,
    private service: JkWaitService
  ) {
    this.configData = {
      ...this.configData,
      ...this.config
    };
    this.isTextType = (this.config.type === 'TEXT' || this.config.type === 'TEXT_SPINNER');
    this.isSpinnerType = (this.config.type === 'SPINNER' || this.config.type === 'TEXT_SPINNER');
  }

  ngOnInit() {
    this.subs = this.service.watch.subscribe( event => {
      this.show = event === 'START';
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
