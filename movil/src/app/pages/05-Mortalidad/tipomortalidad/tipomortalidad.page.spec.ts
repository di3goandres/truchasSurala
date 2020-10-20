import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipomortalidadPage } from './tipomortalidad.page';

describe('TipomortalidadPage', () => {
  let component: TipomortalidadPage;
  let fixture: ComponentFixture<TipomortalidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipomortalidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipomortalidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
