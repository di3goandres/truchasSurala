import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePedidoComponent } from './informe-pedido.component';

describe('InformePedidoComponent', () => {
  let component: InformePedidoComponent;
  let fixture: ComponentFixture<InformePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
