import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdistribucionComponent } from './verdistribucion.component';

describe('VerdistribucionComponent', () => {
  let component: VerdistribucionComponent;
  let fixture: ComponentFixture<VerdistribucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdistribucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdistribucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
