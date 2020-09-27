import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearinformesTecnicosComponent } from './crearinformes-tecnicos.component';

describe('CrearinformesTecnicosComponent', () => {
  let component: CrearinformesTecnicosComponent;
  let fixture: ComponentFixture<CrearinformesTecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearinformesTecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearinformesTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
