import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MortalidadpreguntasComponent } from './mortalidadpreguntas.component';

describe('MortalidadpreguntasComponent', () => {
  let component: MortalidadpreguntasComponent;
  let fixture: ComponentFixture<MortalidadpreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortalidadpreguntasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MortalidadpreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
