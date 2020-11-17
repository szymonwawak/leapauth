import {TestBed} from '@angular/core/testing';

import {LeapVisualisationInitializerService} from './leap-visualisation-initializer.service';

describe('LeapVisualisationInitializerService', () => {
  let service: LeapVisualisationInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeapVisualisationInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
