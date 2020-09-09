import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerdespachosComponent } from './verdespachos.component';

describe('VerdespachosComponent', () => {
  let component: VerdespachosComponent;
  let fixture: ComponentFixture<VerdespachosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdespachosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerdespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
