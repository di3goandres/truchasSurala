import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucioncrearComponent } from './distribucioncrear.component';

describe('DistribucioncrearComponent', () => {
  let component: DistribucioncrearComponent;
  let fixture: ComponentFixture<DistribucioncrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribucioncrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribucioncrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
