import {TestBed} from '@angular/core/testing';

import {JsonHelperService} from './json-helper.service';

describe('JsonHelperService', () => {
  let service: JsonHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
