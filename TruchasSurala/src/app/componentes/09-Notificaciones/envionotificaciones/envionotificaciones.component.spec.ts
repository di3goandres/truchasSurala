import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvionotificacionesComponent } from './envionotificaciones.component';

describe('EnvionotificacionesComponent', () => {
  let component: EnvionotificacionesComponent;
  let fixture: ComponentFixture<EnvionotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvionotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvionotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
