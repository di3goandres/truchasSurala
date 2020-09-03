import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroExitosoComponent } from './registro-exitoso.component';

describe('RegistroExitosoComponent', () => {
  let component: RegistroExitosoComponent;
  let fixture: ComponentFixture<RegistroExitosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroExitosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
