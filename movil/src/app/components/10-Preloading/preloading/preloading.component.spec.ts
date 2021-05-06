import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreloadingComponent } from './preloading.component';

describe('PreloadingComponent', () => {
  let component: PreloadingComponent;
  let fixture: ComponentFixture<PreloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
