import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadespachosfacturaComponent } from './listadespachosfactura.component';

describe('ListadespachosfacturaComponent', () => {
  let component: ListadespachosfacturaComponent;
  let fixture: ComponentFixture<ListadespachosfacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadespachosfacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadespachosfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
