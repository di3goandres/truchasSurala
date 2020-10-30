import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarpdfinformeComponent } from './actualizarpdfinforme.component';

describe('ActualizarpdfinformeComponent', () => {
  let component: ActualizarpdfinformeComponent;
  let fixture: ComponentFixture<ActualizarpdfinformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarpdfinformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarpdfinformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
