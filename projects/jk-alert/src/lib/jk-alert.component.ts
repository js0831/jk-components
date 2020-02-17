import { Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import { AlertInterface } from './alert.interface';
import { JkAlertService } from './jk-alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ng-jk-alert',
  templateUrl: 'jk-alert.component.html',
  styleUrls: [
    'jk-alert.component.scss'
  ]
})
export class JkAlertComponent implements OnInit, OnDestroy {

  show = false;
  alert: AlertInterface;
  subs: Subscription;

  constructor(
    private srv: JkAlertService,
    private elref: ElementRef
  ) { }

  ngOnInit() {
    this.subs = this.srv.watch.subscribe( x => {
      if (x.name === 'SHOW_ALERT') {
        this.alert = x.data;
        this.show = true;

        setTimeout(y => {
          this.focusFirstButton();
        }, 100);
      }
    });
  }

  private focusFirstButton() {
      this.elref.nativeElement.querySelectorAll('.alert__buttons button')[0].focus();
  }

  answer(ans: string) {
    this.srv.answer(ans);
    this.show = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
