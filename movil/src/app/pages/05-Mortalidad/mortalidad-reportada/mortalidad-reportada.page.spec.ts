import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MortalidadReportadaPage } from './mortalidad-reportada.page';

describe('MortalidadReportadaPage', () => {
  let component: MortalidadReportadaPage;
  let fixture: ComponentFixture<MortalidadReportadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortalidadReportadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MortalidadReportadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
