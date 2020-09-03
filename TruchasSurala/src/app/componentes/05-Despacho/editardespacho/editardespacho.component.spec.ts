import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditardespachoComponent } from './editardespacho.component';

describe('EditardespachoComponent', () => {
  let component: EditardespachoComponent;
  let fixture: ComponentFixture<EditardespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditardespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
