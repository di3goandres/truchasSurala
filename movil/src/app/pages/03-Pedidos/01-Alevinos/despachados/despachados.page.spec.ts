import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DespachadosPage } from './despachados.page';

describe('DespachadosPage', () => {
  let component: DespachadosPage;
  let fixture: ComponentFixture<DespachadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DespachadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
