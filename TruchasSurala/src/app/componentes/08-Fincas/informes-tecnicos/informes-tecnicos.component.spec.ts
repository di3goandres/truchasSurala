import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesTecnicosComponent } from './informes-tecnicos.component';

describe('InformesTecnicosComponent', () => {
  let component: InformesTecnicosComponent;
  let fixture: ComponentFixture<InformesTecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesTecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
