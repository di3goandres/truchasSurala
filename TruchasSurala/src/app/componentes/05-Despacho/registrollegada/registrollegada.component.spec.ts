import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrollegadaComponent } from './registrollegada.component';

describe('RegistrollegadaComponent', () => {
  let component: RegistrollegadaComponent;
  let fixture: ComponentFixture<RegistrollegadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrollegadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrollegadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
