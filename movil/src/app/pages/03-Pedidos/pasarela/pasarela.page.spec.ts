import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasarelaPage } from './pasarela.page';

describe('PasarelaPage', () => {
  let component: PasarelaPage;
  let fixture: ComponentFixture<PasarelaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasarelaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasarelaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
