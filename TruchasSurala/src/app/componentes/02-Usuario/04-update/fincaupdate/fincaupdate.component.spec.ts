import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FincaupdateComponent } from './fincaupdate.component';

describe('FincaupdateComponent', () => {
  let component: FincaupdateComponent;
  let fixture: ComponentFixture<FincaupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FincaupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FincaupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
