import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MortalidadpedidosPage } from './mortalidadpedidos.page';

describe('MortalidadpedidosPage', () => {
  let component: MortalidadpedidosPage;
  let fixture: ComponentFixture<MortalidadpedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortalidadpedidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MortalidadpedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
