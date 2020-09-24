import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualizarfotofincaComponent } from './actualizarfotofinca.component';

describe('ActualizarfotofincaComponent', () => {
  let component: ActualizarfotofincaComponent;
  let fixture: ComponentFixture<ActualizarfotofincaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarfotofincaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarfotofincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
