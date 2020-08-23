import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListafincasComponent } from './listafincas.component';

describe('ListafincasComponent', () => {
  let component: ListafincasComponent;
  let fixture: ComponentFixture<ListafincasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListafincasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListafincasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
