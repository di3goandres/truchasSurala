import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontajePedidoComponent } from './montaje-pedido.component';

describe('MontajePedidoComponent', () => {
  let component: MontajePedidoComponent;
  let fixture: ComponentFixture<MontajePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontajePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontajePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
