import { Component } from '@angular/core';
import { JkWaitService } from 'projects/jk-wait/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jk-components';


  constructor(
    private wait: JkWaitService
  ) {
    setTimeout( x => {
      this.wait.start();
    }, 500);

    setTimeout( x => {
      this.wait.end();
    }, 2000);
  }
}
