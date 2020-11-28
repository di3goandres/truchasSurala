import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarregistroComponent } from './aprobarregistro.component';

describe('AprobarregistroComponent', () => {
  let component: AprobarregistroComponent;
  let fixture: ComponentFixture<AprobarregistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarregistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
