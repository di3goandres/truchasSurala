import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoactualComponent } from './despachoactual.component';

describe('DespachoactualComponent', () => {
  let component: DespachoactualComponent;
  let fixture: ComponentFixture<DespachoactualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachoactualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachoactualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
