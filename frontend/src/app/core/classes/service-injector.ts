import {Injector, StaticProvider} from '@angular/core';
import {NavigationService} from '../services/navigation.service';

export class ServiceInjector {
  static injector: Injector;
}

export const services: StaticProvider[] = [
  {provide: NavigationService, useClass: NavigationService, deps: []}
];
