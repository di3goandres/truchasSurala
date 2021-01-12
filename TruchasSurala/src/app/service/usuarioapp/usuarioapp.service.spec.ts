import { TestBed } from '@angular/core/testing';

import { UsuarioappService } from './usuarioapp.service';

describe('UsuarioappService', () => {
  let service: UsuarioappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
