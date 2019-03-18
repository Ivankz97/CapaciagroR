import { TestBed, inject } from '@angular/core/testing';

import { DataApiService } from './data-api.service';

describe('DataApiService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({}));

  it('should be created', inject([DataApiService], (service: DataApiService) => {
    expect(service).toBeTruthy();
  }));
});
