import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMontajeComponent } from './editar-montaje.component';

describe('EditarMontajeComponent', () => {
  let component: EditarMontajeComponent;
  let fixture: ComponentFixture<EditarMontajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMontajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMontajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
