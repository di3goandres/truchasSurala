import { TestBed } from '@angular/core/testing';

import { AlevinoGuard } from './alevino.guard';

describe('AlevinoGuard', () => {
  let guard: AlevinoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlevinoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
