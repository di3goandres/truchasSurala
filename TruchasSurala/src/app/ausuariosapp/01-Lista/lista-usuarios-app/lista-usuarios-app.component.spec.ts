import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosAPPComponent } from './lista-usuarios-app.component';

describe('ListaUsuariosAPPComponent', () => {
  let component: ListaUsuariosAPPComponent;
  let fixture: ComponentFixture<ListaUsuariosAPPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaUsuariosAPPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUsuariosAPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
