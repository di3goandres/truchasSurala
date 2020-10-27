import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListafotosComponent } from './listafotos.component';

describe('ListafotosComponent', () => {
  let component: ListafotosComponent;
  let fixture: ComponentFixture<ListafotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListafotosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListafotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
