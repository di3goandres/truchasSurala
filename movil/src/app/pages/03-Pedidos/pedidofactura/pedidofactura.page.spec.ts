import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidofacturaPage } from './pedidofactura.page';

describe('PedidofacturaPage', () => {
  let component: PedidofacturaPage;
  let fixture: ComponentFixture<PedidofacturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidofacturaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidofacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
