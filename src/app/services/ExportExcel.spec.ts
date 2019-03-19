import { TestBed } from '@angular/core/testing';

import { ExcelService } from './ExportExcel';

describe('ExportExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelService = TestBed.get(ExcelService);
    expect(service).toBeTruthy();
  });
});
