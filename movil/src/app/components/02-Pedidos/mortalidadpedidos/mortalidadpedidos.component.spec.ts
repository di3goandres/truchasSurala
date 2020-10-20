import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MortalidadpedidosComponent } from './mortalidadpedidos.component';

describe('MortalidadpedidosComponent', () => {
  let component: MortalidadpedidosComponent;
  let fixture: ComponentFixture<MortalidadpedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortalidadpedidosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MortalidadpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
