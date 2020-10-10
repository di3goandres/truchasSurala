import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNoexitosoComponent } from './registro-noexitoso.component';

describe('RegistroNoexitosoComponent', () => {
  let component: RegistroNoexitosoComponent;
  let fixture: ComponentFixture<RegistroNoexitosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroNoexitosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNoexitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
