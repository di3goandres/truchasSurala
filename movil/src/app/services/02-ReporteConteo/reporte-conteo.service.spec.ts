import { TestBed } from '@angular/core/testing';

import { ReporteConteoService } from './reporte-conteo.service';

describe('ReporteConteoService', () => {
  let service: ReporteConteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteConteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
