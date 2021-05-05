import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlevinosArchivosPage } from './alevinos-archivos.page';

describe('AlevinosArchivosPage', () => {
  let component: AlevinosArchivosPage;
  let fixture: ComponentFixture<AlevinosArchivosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlevinosArchivosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlevinosArchivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
