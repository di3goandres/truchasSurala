import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadeinformesComponent } from './listadeinformes.component';

describe('ListadeinformesComponent', () => {
  let component: ListadeinformesComponent;
  let fixture: ComponentFixture<ListadeinformesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadeinformesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadeinformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
