import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasarelaMortalidadPage } from './pasarela-mortalidad.page';

describe('PasarelaMortalidadPage', () => {
  let component: PasarelaMortalidadPage;
  let fixture: ComponentFixture<PasarelaMortalidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasarelaMortalidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasarelaMortalidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
