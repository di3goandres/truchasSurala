import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecordatorioMortalidadComponent } from './recordatorio-mortalidad.component';

describe('RecordatorioMortalidadComponent', () => {
  let component: RecordatorioMortalidadComponent;
  let fixture: ComponentFixture<RecordatorioMortalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordatorioMortalidadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordatorioMortalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
