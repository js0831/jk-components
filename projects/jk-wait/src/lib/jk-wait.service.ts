import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';

enum E1 {
  A, B, C
}

@Injectable({
  providedIn: 'root'
})
export class JkWaitService {

  private event = new Subject<{event: string, data?: any}>();
  constructor(
  ) { }

  start() {
    this.event.next({
      event: 'START'
    });
  }

  end() {
    this.event.next({
      event: 'END'
    });
  }

  get watch(): Observable<string> {
    return new Observable<string>( (i) => {
      this.event.subscribe( x => {
        i.next(x.event);
      });
    });
  }
}
