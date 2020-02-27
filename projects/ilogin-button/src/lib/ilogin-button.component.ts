import { Component, OnInit, Inject, ViewEncapsulation, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { ILoginConfig } from './config/ilogin.config';
import { ILoginConfigService } from './config/ilogin-config.service';

@Component({
  selector: 'jk-ilogin-button',
  template: `{{label}}`,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class IloginButtonComponent implements OnInit {

  @Input() label = 'Login';
  @Output() onsuccess: EventEmitter<{token: string, user: any}> = new EventEmitter<{token: string, user: any}>();



  private win: any;
  private loginUrl = 'https://ilogin.netlify.com';

  constructor(
    @Inject(ILoginConfigService) private config: ILoginConfig,
  ) { }

  ngOnInit() {
  }

  login() {
    this.win = window.open(
      this.loginUrl,
      'Login' ,
      'dialog=yes,directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no');
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    this.login();
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    this.listentoWindowMessage(event);
  }

  private listentoWindowMessage(event: any) {
    const action = event.data.action;
    switch (action) {
      case 'SSO_PAGE_LOADED':
        this.submitAppID();
        break;
      case 'LOGIN':
        this.onsuccess.emit(event.data.data.data);
        break;
      default:
        break;
    }
  }

  private submitAppID() {
    this.win.postMessage({
        action: 'SUBMIT_APP_ID',
        data: this.config.appId,
    }, this.loginUrl);
  }
}
