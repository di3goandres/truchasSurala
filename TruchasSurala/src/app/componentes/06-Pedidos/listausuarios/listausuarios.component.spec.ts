import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListausuariosComponent } from './listausuarios.component';

describe('ListausuariosComponent', () => {
  let component: ListausuariosComponent;
  let fixture: ComponentFixture<ListausuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListausuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
