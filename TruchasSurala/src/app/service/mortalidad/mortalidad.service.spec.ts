import { TestBed } from '@angular/core/testing';

import { MortalidadService } from './mortalidad.service';

describe('MortalidadService', () => {
  let service: MortalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
