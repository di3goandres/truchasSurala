import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DespachosPage } from './despachos.page';

describe('DespachosPage', () => {
  let component: DespachosPage;
  let fixture: ComponentFixture<DespachosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DespachosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
