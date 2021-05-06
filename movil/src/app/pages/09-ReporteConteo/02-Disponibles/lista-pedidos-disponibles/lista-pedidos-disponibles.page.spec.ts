import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaPedidosDisponiblesPage } from './lista-pedidos-disponibles.page';

describe('ListaPedidosDisponiblesPage', () => {
  let component: ListaPedidosDisponiblesPage;
  let fixture: ComponentFixture<ListaPedidosDisponiblesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPedidosDisponiblesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPedidosDisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
