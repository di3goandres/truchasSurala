import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DespachosAlevinosPage } from './despachos-alevinos.page';

describe('DespachosAlevinosPage', () => {
  let component: DespachosAlevinosPage;
  let fixture: ComponentFixture<DespachosAlevinosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachosAlevinosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DespachosAlevinosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
