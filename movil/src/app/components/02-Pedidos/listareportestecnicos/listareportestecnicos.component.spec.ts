import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListareportestecnicosComponent } from './listareportestecnicos.component';

describe('ListareportestecnicosComponent', () => {
  let component: ListareportestecnicosComponent;
  let fixture: ComponentFixture<ListareportestecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListareportestecnicosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListareportestecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
