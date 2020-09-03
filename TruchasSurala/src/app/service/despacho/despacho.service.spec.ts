import { TestBed } from '@angular/core/testing';

import { DespachoService } from './despacho.service';

describe('DespachoService', () => {
  let service: DespachoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DespachoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
