import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MortalidaddiariaPage } from './mortalidaddiaria.page';

describe('MortalidaddiariaPage', () => {
  let component: MortalidaddiariaPage;
  let fixture: ComponentFixture<MortalidaddiariaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortalidaddiariaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MortalidaddiariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
