import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasarelaConteoPage } from './pasarela-conteo.page';

describe('PasarelaConteoPage', () => {
  let component: PasarelaConteoPage;
  let fixture: ComponentFixture<PasarelaConteoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasarelaConteoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasarelaConteoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
