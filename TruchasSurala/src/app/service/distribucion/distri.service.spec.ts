import { TestBed } from '@angular/core/testing';

import { DistriService } from './distri.service';

describe('DistriService', () => {
  let service: DistriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
