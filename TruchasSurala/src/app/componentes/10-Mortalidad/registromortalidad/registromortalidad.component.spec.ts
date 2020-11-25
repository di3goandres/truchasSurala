import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistromortalidadComponent } from './registromortalidad.component';

describe('RegistromortalidadComponent', () => {
  let component: RegistromortalidadComponent;
  let fixture: ComponentFixture<RegistromortalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistromortalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistromortalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
