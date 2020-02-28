import { InjectionToken } from '@angular/core';
import { FormlyBuilderConfig } from './formly-builder.config';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const FormlyBuilderConfigService = new InjectionToken<FormlyBuilderConfig>('FormlyBuilderConfig');
