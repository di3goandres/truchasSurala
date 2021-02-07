import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidoAlevinosComponent } from './lista-pedido-alevinos.component';

describe('ListaPedidoAlevinosComponent', () => {
  let component: ListaPedidoAlevinosComponent;
  let fixture: ComponentFixture<ListaPedidoAlevinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPedidoAlevinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPedidoAlevinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
