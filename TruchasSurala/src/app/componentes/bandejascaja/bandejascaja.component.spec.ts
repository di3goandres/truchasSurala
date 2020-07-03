import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejascajaComponent } from './bandejascaja.component';

describe('BandejascajaComponent', () => {
  let component: BandejascajaComponent;
  let fixture: ComponentFixture<BandejascajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandejascajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejascajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
