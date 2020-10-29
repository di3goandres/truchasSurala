import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreferirnosPage } from './preferirnos.page';

describe('PreferirnosPage', () => {
  let component: PreferirnosPage;
  let fixture: ComponentFixture<PreferirnosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferirnosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreferirnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
