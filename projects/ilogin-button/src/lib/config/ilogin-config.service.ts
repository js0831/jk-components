import { InjectionToken } from '@angular/core';
import { ILoginConfig } from './ilogin.config';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const ILoginConfigService = new InjectionToken<ILoginConfig>('WaitConfig');
