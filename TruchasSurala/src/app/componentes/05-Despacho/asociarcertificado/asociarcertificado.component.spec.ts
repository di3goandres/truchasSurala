import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarcertificadoComponent } from './asociarcertificado.component';

describe('AsociarcertificadoComponent', () => {
  let component: AsociarcertificadoComponent;
  let fixture: ComponentFixture<AsociarcertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarcertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarcertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
