import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaConteoReportadaComponent } from './lista-conteo-reportada.component';

describe('ListaConteoReportadaComponent', () => {
  let component: ListaConteoReportadaComponent;
  let fixture: ComponentFixture<ListaConteoReportadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaConteoReportadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaConteoReportadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
