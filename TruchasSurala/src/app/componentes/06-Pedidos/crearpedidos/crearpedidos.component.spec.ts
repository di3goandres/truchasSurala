import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpedidosComponent } from './crearpedidos.component';

describe('CrearpedidosComponent', () => {
  let component: CrearpedidosComponent;
  let fixture: ComponentFixture<CrearpedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
