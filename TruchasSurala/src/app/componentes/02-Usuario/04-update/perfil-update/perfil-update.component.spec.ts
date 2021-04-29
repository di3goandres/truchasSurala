import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUpdateComponent } from './perfil-update.component';

describe('PerfilUpdateComponent', () => {
  let component: PerfilUpdateComponent;
  let fixture: ComponentFixture<PerfilUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
