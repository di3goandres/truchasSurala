import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRegistrosComponent } from './lista-registros.component';

describe('ListaRegistrosComponent', () => {
  let component: ListaRegistrosComponent;
  let fixture: ComponentFixture<ListaRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
