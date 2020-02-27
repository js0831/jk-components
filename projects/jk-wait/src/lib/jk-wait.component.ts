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
  private rootConfig: WaitConfig;

  constructor(
    @Inject(WaitConfigService) private config: WaitConfig,
    private service: JkWaitService
  ) {
    this.rootConfig = config;
  }

  ngOnInit() {
    this.subs = this.service.watch.subscribe( x => {
      if (x.data) {
        this.setConfig(x.data);
      } else {
        this.setConfig(this.rootConfig);
      }
      this.show = x.name === 'START';
    });
  }

  private setConfig(config) {
    this.configData = {
      ...this.configData,
      ...config
    };
    this.isTextType = (config.type === 'TEXT' || config.type === 'TEXT_SPINNER');
    this.isSpinnerType = (config.type === 'SPINNER' || config.type === 'TEXT_SPINNER');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
