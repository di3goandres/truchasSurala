import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListafincasComponent } from './listafincas.component';

describe('ListafincasComponent', () => {
  let component: ListafincasComponent;
  let fixture: ComponentFixture<ListafincasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListafincasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListafincasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
