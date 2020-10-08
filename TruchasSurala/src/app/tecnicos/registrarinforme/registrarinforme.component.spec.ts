import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarinformeComponent } from './registrarinforme.component';

describe('RegistrarinformeComponent', () => {
  let component: RegistrarinformeComponent;
  let fixture: ComponentFixture<RegistrarinformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarinformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarinformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
