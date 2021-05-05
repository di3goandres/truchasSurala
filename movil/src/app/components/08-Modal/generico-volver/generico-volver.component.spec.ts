import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenericoVolverComponent } from './generico-volver.component';

describe('GenericoVolverComponent', () => {
  let component: GenericoVolverComponent;
  let fixture: ComponentFixture<GenericoVolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericoVolverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericoVolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
