import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidaddespachadoComponent } from './cantidaddespachado.component';

describe('CantidaddespachadoComponent', () => {
  let component: CantidaddespachadoComponent;
  let fixture: ComponentFixture<CantidaddespachadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantidaddespachadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantidaddespachadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
