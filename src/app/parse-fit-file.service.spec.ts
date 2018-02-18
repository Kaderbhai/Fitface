import { TestBed, inject } from '@angular/core/testing';

import { ParseFitFileService } from './parse-fit-file.service';

describe('ParseFitFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseFitFileService]
    });
  });

  it('should be created', inject([ParseFitFileService], (service: ParseFitFileService) => {
    expect(service).toBeTruthy();
  }));
});
