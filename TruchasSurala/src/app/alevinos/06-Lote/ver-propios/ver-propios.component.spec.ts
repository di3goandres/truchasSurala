import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPropiosComponent } from './ver-propios.component';

describe('VerPropiosComponent', () => {
  let component: VerPropiosComponent;
  let fixture: ComponentFixture<VerPropiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPropiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPropiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
