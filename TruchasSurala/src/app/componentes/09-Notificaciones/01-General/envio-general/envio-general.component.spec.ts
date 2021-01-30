import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioGeneralComponent } from './envio-general.component';

describe('EnvioGeneralComponent', () => {
  let component: EnvioGeneralComponent;
  let fixture: ComponentFixture<EnvioGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
