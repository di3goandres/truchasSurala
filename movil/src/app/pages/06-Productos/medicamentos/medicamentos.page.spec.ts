import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicamentosPage } from './medicamentos.page';

describe('MedicamentosPage', () => {
  let component: MedicamentosPage;
  let fixture: ComponentFixture<MedicamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
