import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlevinosDespachadosComponent } from './alevinos-despachados.component';

describe('AlevinosDespachadosComponent', () => {
  let component: AlevinosDespachadosComponent;
  let fixture: ComponentFixture<AlevinosDespachadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlevinosDespachadosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlevinosDespachadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
