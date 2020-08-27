import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuciongloballistComponent } from './distribuciongloballist.component';

describe('DistribuciongloballistComponent', () => {
  let component: DistribuciongloballistComponent;
  let fixture: ComponentFixture<DistribuciongloballistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuciongloballistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuciongloballistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
