import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazabilidadesComponent } from './trazabilidades.component';

describe('TrazabilidadesComponent', () => {
  let component: TrazabilidadesComponent;
  let fixture: ComponentFixture<TrazabilidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazabilidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
