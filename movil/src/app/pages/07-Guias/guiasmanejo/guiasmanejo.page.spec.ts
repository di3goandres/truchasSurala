import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuiasmanejoPage } from './guiasmanejo.page';

describe('GuiasmanejoPage', () => {
  let component: GuiasmanejoPage;
  let fixture: ComponentFixture<GuiasmanejoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiasmanejoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuiasmanejoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
