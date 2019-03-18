import { TestBed, inject } from '@angular/core/testing';

import { ExelserviceService } from './exelservice.service';

describe('ExelserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExelserviceService]
    });
  });

  it('should be created', inject([ExelserviceService], (service: ExelserviceService) => {
    expect(service).toBeTruthy();
  }));
});
