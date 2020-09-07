import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapedidosfacturaComponent } from './listapedidosfactura.component';

describe('ListapedidosfacturaComponent', () => {
  let component: ListapedidosfacturaComponent;
  let fixture: ComponentFixture<ListapedidosfacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapedidosfacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapedidosfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
