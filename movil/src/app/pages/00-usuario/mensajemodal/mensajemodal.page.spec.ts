import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensajemodalPage } from './mensajemodal.page';

describe('MensajemodalPage', () => {
  let component: MensajemodalPage;
  let fixture: ComponentFixture<MensajemodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajemodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensajemodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
