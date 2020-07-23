import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitadosComponent } from './invitados.component';

describe('InvitadosComponent', () => {
  let component: InvitadosComponent;
  let fixture: ComponentFixture<InvitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitadosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
