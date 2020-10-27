import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalregistrollegadaComponent } from './modalregistrollegada.component';

describe('ModalregistrollegadaComponent', () => {
  let component: ModalregistrollegadaComponent;
  let fixture: ComponentFixture<ModalregistrollegadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalregistrollegadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalregistrollegadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
