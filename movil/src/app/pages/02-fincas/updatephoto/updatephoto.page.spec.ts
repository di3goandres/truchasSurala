import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatephotoPage } from './updatephoto.page';

describe('UpdatephotoPage', () => {
  let component: UpdatephotoPage;
  let fixture: ComponentFixture<UpdatephotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatephotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatephotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
