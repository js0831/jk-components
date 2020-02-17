import { Injectable } from '@angular/core';
import { AlertInterface, AlertType } from './alert.interface';
import { Subject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JkAlertService {

  private event = new Subject<{
    name: string,
    data?: any
  }>();

  constructor() { }

  success(message: string, title?: string) {
    const data: AlertInterface = {
      title: title || 'Success!',
      type: AlertType.SUCCESS,
      message,
    };

    return this.alert(data);
  }

  error(message: string, title?: string) {
    const data: AlertInterface = {
      title: title || 'Error!',
      type: AlertType.ERROR,
      message,
    };

    return this.alert(data);
  }

  info(message: string, title?: string) {
    const data: AlertInterface = {
      title: title || 'Info',
      type: AlertType.INFO,
      message,
    };

    return this.alert(data);
  }

  warning(message: string, title?: string) {
    const data: AlertInterface = {
      title: title || 'Warning!',
      type: AlertType.WARNING,
      message,
    };

    return this.alert(data);
  }

  confirm(message: string, buttons: string[], title?: string) {
    const data: AlertInterface = {
      title: title || 'Confirm?',
      type: AlertType.CONFIRM,
      message,
      buttons
    };

    return this.alert(data);
  }

  alert(data: AlertInterface) {
    if (!data.buttons || data.buttons.length === 0) {
      data.buttons = ['Ok'];
    }
    this.event.next({
      name: 'SHOW_ALERT',
      data,
    });

    return new Promise( (resolve, reject) => {
      this.event.subscribe( x => {
        if (x.name === 'ALERT_ANSWER') {
          resolve(x.data);
        }
      });
    });
  }

  answer(ans) {
    this.event.next({
      name: 'ALERT_ANSWER',
      data: ans,
    });
  }

  get watch(): Observable<{
    name: string,
    data?: any
  }> {
    return new Observable<{
      name: string,
      data?: any
    }>( a => {
      this.event.subscribe( b => {
        a.next(b);
      });
    });
  }
}
