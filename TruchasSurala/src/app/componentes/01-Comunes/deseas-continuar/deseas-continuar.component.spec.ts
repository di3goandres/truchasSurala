import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeseasContinuarComponent } from './deseas-continuar.component';

describe('DeseasContinuarComponent', () => {
  let component: DeseasContinuarComponent;
  let fixture: ComponentFixture<DeseasContinuarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeseasContinuarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeseasContinuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
