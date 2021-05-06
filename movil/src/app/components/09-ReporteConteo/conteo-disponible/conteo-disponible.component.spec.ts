import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConteoDisponibleComponent } from './conteo-disponible.component';

describe('ConteoDisponibleComponent', () => {
  let component: ConteoDisponibleComponent;
  let fixture: ComponentFixture<ConteoDisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConteoDisponibleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConteoDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
