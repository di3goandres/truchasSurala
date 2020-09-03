import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreardespachoComponent } from './creardespacho.component';

describe('CreardespachoComponent', () => {
  let component: CreardespachoComponent;
  let fixture: ComponentFixture<CreardespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreardespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreardespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
