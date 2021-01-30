import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlevinosprogramcionComponent } from './alevinosprogramcion.component';

describe('AlevinosprogramcionComponent', () => {
  let component: AlevinosprogramcionComponent;
  let fixture: ComponentFixture<AlevinosprogramcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlevinosprogramcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlevinosprogramcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
