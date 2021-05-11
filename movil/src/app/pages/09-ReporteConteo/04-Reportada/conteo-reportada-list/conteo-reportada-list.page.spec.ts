import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConteoReportadaListPage } from './conteo-reportada-list.page';

describe('ConteoReportadaListPage', () => {
  let component: ConteoReportadaListPage;
  let fixture: ComponentFixture<ConteoReportadaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConteoReportadaListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConteoReportadaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
