import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCertificadoOrigenComponent } from './ver-certificado-origen.component';

describe('VerCertificadoOrigenComponent', () => {
  let component: VerCertificadoOrigenComponent;
  let fixture: ComponentFixture<VerCertificadoOrigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCertificadoOrigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCertificadoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
