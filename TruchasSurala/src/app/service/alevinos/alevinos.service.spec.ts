import { TestBed } from '@angular/core/testing';

import { AlevinosService } from './alevinos.service';

describe('AlevinosService', () => {
  let service: AlevinosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlevinosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
