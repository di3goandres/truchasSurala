import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreardistribucionComponent } from './creardistribucion.component';

describe('CreardistribucionComponent', () => {
  let component: CreardistribucionComponent;
  let fixture: ComponentFixture<CreardistribucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreardistribucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreardistribucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
