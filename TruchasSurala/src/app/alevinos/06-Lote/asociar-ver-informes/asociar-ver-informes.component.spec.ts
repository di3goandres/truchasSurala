import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarVerInformesComponent } from './asociar-ver-informes.component';

describe('AsociarVerInformesComponent', () => {
  let component: AsociarVerInformesComponent;
  let fixture: ComponentFixture<AsociarVerInformesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarVerInformesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarVerInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
