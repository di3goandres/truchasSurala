import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosConReportesComponent } from './usuarios-con-reportes.component';

describe('UsuariosConReportesComponent', () => {
  let component: UsuariosConReportesComponent;
  let fixture: ComponentFixture<UsuariosConReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosConReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosConReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
