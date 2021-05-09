import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportePorTrazabilidadPage } from './reporte-por-trazabilidad.page';

describe('ReportePorTrazabilidadPage', () => {
  let component: ReportePorTrazabilidadPage;
  let fixture: ComponentFixture<ReportePorTrazabilidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePorTrazabilidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportePorTrazabilidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
