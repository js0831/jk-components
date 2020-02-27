import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { WaitConfig } from './config/wait.config';
import { WaitEventInterface } from './interface/wait-event.interface';

enum E1 {
  A, B, C
}

@Injectable({
  providedIn: 'root'
})
export class JkWaitService {

  private event = new Subject<WaitEventInterface>();
  constructor(
  ) { }

  start(config?: WaitConfig) {
    this.event.next({
      name: 'START',
      data: config
    });
  }

  end() {
    this.event.next({
      name: 'END'
    });
  }

  get watch(): Observable<WaitEventInterface> {
    return new Observable<WaitEventInterface>( (i) => {
      this.event.subscribe( x => {
        i.next(x);
      });
    });
  }
}
