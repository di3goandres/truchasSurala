import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpedidoComponent } from './editarpedido.component';

describe('EditarpedidoComponent', () => {
  let component: EditarpedidoComponent;
  let fixture: ComponentFixture<EditarpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
