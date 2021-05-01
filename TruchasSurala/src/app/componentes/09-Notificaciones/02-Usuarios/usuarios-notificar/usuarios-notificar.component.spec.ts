import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosNotificarComponent } from './usuarios-notificar.component';

describe('UsuariosNotificarComponent', () => {
  let component: UsuariosNotificarComponent;
  let fixture: ComponentFixture<UsuariosNotificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosNotificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosNotificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
