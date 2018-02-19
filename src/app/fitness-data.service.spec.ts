import { TestBed, inject } from '@angular/core/testing';

import { FitnessDataService } from './fitness-data.service';

describe('FitnessDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitnessDataService]
    });
  });

  it('should be created', inject([FitnessDataService], (service: FitnessDataService) => {
    expect(service).toBeTruthy();
  }));
});
