import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpedidoComponent } from './agregarpedido.component';

describe('AgregarpedidoComponent', () => {
  let component: AgregarpedidoComponent;
  let fixture: ComponentFixture<AgregarpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
