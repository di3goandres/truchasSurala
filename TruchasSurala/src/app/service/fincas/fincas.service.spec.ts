import { TestBed } from '@angular/core/testing';

import { FincasService } from './fincas.service';

describe('FincasService', () => {
  let service: FincasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FincasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
