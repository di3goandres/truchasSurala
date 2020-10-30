import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarusuarioComponent } from './seleccionarusuario.component';

describe('SeleccionarusuarioComponent', () => {
  let component: SeleccionarusuarioComponent;
  let fixture: ComponentFixture<SeleccionarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
