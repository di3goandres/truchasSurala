import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FincasPage } from './fincas.page';

describe('FincasPage', () => {
  let component: FincasPage;
  let fixture: ComponentFixture<FincasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FincasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FincasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
