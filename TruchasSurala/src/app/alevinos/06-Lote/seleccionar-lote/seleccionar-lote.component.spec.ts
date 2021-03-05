import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarLoteComponent } from './seleccionar-lote.component';

describe('SeleccionarLoteComponent', () => {
  let component: SeleccionarLoteComponent;
  let fixture: ComponentFixture<SeleccionarLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
