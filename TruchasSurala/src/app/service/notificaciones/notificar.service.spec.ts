import { TestBed } from '@angular/core/testing';

import { NotificarService } from './notificar.service';

describe('NotificarService', () => {
  let service: NotificarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
