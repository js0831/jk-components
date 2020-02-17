import { NgModule, ModuleWithProviders } from '@angular/core';
import { JkWaitComponent } from './jk-wait.component';
import { CommonModule } from '@angular/common';
import { WaitConfig } from './config/wait.config';
import { JkWaitService } from './jk-wait.service';
import { WaitConfigService } from './config/wait-config.service';



@NgModule({
  declarations: [JkWaitComponent],
  imports: [
    CommonModule
  ],
  exports: [JkWaitComponent]
})
export class JkWaitModule {

  static forRoot(config: WaitConfig): ModuleWithProviders {
    return {
      ngModule: JkWaitModule,
      providers: [
        JkWaitService,
        {
          provide: WaitConfigService,
          useValue: config
        }
      ]
    };
  }

}
