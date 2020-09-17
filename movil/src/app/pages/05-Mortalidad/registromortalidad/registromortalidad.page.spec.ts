import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistromortalidadPage } from './registromortalidad.page';

describe('RegistromortalidadPage', () => {
  let component: RegistromortalidadPage;
  let fixture: ComponentFixture<RegistromortalidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistromortalidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistromortalidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
