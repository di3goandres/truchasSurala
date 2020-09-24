import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilusuarioPage } from './perfilusuario.page';

describe('PerfilusuarioPage', () => {
  let component: PerfilusuarioPage;
  let fixture: ComponentFixture<PerfilusuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilusuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
