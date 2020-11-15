import {TestBed} from '@angular/core/testing';

import {FrameDataExtractorService} from './frame-data-extractor.service';

describe('FrameDataExtractorService', () => {
  let service: FrameDataExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameDataExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
