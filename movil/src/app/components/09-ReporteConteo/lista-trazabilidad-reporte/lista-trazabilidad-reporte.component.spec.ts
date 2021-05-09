import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaTrazabilidadReporteComponent } from './lista-trazabilidad-reporte.component';

describe('ListaTrazabilidadReporteComponent', () => {
  let component: ListaTrazabilidadReporteComponent;
  let fixture: ComponentFixture<ListaTrazabilidadReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTrazabilidadReporteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTrazabilidadReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
