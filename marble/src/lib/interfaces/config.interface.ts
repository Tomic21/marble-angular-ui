import { InjectionToken } from '@angular/core';

export const CONFIG = new InjectionToken<Config>('config');

export interface Config {
    key?: string;
}
