import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarloteComponent } from './borrarlote.component';

describe('BorrarloteComponent', () => {
  let component: BorrarloteComponent;
  let fixture: ComponentFixture<BorrarloteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarloteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarloteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
