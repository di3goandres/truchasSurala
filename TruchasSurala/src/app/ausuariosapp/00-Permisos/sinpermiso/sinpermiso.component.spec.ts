import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinpermisoComponent } from './sinpermiso.component';

describe('SinpermisoComponent', () => {
  let component: SinpermisoComponent;
  let fixture: ComponentFixture<SinpermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinpermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
