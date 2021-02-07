import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaDespachoComponent } from './dia-despacho.component';

describe('DiaDespachoComponent', () => {
  let component: DiaDespachoComponent;
  let fixture: ComponentFixture<DiaDespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaDespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
