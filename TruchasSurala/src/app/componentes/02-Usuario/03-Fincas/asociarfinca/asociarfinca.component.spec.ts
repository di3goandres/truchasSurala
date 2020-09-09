import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarfincaComponent } from './asociarfinca.component';

describe('AsociarfincaComponent', () => {
  let component: AsociarfincaComponent;
  let fixture: ComponentFixture<AsociarfincaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarfincaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarfincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
