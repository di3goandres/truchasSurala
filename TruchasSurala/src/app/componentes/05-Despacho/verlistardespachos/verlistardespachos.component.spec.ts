import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerlistardespachosComponent } from './verlistardespachos.component';

describe('VerlistardespachosComponent', () => {
  let component: VerlistardespachosComponent;
  let fixture: ComponentFixture<VerlistardespachosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerlistardespachosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerlistardespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
