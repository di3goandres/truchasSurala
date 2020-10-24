import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalpdfComponent } from './modalpdf.component';

describe('ModalpdfComponent', () => {
  let component: ModalpdfComponent;
  let fixture: ComponentFixture<ModalpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpdfComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
