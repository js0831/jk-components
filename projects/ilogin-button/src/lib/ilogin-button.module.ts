import { NgModule, ModuleWithProviders } from '@angular/core';
import { IloginButtonComponent } from './ilogin-button.component';
import { ILoginConfig } from './config/ilogin.config';
import { ILoginConfigService } from './config/ilogin-config.service';
import { IloginButtonService } from './ilogin-button.service';



@NgModule({
  declarations: [IloginButtonComponent],
  imports: [
  ],
  exports: [IloginButtonComponent]
})
export class IloginButtonModule {
  static forRoot(config: ILoginConfig): ModuleWithProviders {
    return {
      ngModule: IloginButtonModule,
      providers: [
        IloginButtonService,
        {
          provide: ILoginConfigService,
          useValue: config
        }
      ]
    };
  }
}
