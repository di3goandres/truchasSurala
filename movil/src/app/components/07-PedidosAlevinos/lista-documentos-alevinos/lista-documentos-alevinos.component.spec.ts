import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaDocumentosAlevinosComponent } from './lista-documentos-alevinos.component';

describe('ListaDocumentosAlevinosComponent', () => {
  let component: ListaDocumentosAlevinosComponent;
  let fixture: ComponentFixture<ListaDocumentosAlevinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDocumentosAlevinosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDocumentosAlevinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
