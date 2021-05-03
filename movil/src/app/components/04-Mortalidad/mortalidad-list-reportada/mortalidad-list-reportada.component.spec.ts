import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MortalidadListReportadaComponent } from './mortalidad-list-reportada.component';

describe('MortalidadListReportadaComponent', () => {
  let component: MortalidadListReportadaComponent;
  let fixture: ComponentFixture<MortalidadListReportadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortalidadListReportadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MortalidadListReportadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
