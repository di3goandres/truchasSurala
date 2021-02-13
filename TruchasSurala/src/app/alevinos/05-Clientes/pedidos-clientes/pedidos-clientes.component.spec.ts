import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosClientesComponent } from './pedidos-clientes.component';

describe('PedidosClientesComponent', () => {
  let component: PedidosClientesComponent;
  let fixture: ComponentFixture<PedidosClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
