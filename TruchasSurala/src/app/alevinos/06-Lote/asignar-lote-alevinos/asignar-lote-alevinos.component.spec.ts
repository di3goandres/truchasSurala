import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarLoteAlevinosComponent } from './asignar-lote-alevinos.component';

describe('AsignarLoteAlevinosComponent', () => {
  let component: AsignarLoteAlevinosComponent;
  let fixture: ComponentFixture<AsignarLoteAlevinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarLoteAlevinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarLoteAlevinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
