import { TestBed } from '@angular/core/testing';

import { LeapSocketService } from './leap-socket.service';

describe('LeapSocketService', () => {
  let service: LeapSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeapSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
