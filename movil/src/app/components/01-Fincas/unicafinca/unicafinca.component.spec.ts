import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnicafincaComponent } from './unicafinca.component';

describe('UnicafincaComponent', () => {
  let component: UnicafincaComponent;
  let fixture: ComponentFixture<UnicafincaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnicafincaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnicafincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
