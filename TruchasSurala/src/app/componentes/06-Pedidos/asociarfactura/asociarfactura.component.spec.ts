import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarfacturaComponent } from './asociarfactura.component';

describe('AsociarfacturaComponent', () => {
  let component: AsociarfacturaComponent;
  let fixture: ComponentFixture<AsociarfacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarfacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
