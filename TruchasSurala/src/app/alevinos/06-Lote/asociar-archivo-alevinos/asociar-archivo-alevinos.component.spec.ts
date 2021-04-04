import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarArchivoAlevinosComponent } from './asociar-archivo-alevinos.component';

describe('AsociarArchivoAlevinosComponent', () => {
  let component: AsociarArchivoAlevinosComponent;
  let fixture: ComponentFixture<AsociarArchivoAlevinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarArchivoAlevinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarArchivoAlevinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
