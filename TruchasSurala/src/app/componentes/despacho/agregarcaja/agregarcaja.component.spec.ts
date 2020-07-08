import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarcajaComponent } from './agregarcaja.component';

describe('AgregarcajaComponent', () => {
  let component: AgregarcajaComponent;
  let fixture: ComponentFixture<AgregarcajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarcajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarcajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
