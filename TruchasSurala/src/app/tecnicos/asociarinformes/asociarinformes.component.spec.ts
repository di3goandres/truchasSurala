import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarinformesComponent } from './asociarinformes.component';

describe('AsociarinformesComponent', () => {
  let component: AsociarinformesComponent;
  let fixture: ComponentFixture<AsociarinformesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarinformesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarinformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
