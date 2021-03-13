import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarMortalidadesComponent } from './descargar-mortalidades.component';

describe('DescargarMortalidadesComponent', () => {
  let component: DescargarMortalidadesComponent;
  let fixture: ComponentFixture<DescargarMortalidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarMortalidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarMortalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
