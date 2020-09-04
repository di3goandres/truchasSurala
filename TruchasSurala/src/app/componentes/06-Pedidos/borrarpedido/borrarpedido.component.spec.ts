import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarpedidoComponent } from './borrarpedido.component';

describe('BorrarpedidoComponent', () => {
  let component: BorrarpedidoComponent;
  let fixture: ComponentFixture<BorrarpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
