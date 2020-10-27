import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportestecnicosPage } from './reportestecnicos.page';

describe('ReportestecnicosPage', () => {
  let component: ReportestecnicosPage;
  let fixture: ComponentFixture<ReportestecnicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportestecnicosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportestecnicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
