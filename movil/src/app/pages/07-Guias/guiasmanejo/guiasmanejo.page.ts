import { Component, OnInit } from '@angular/core';
import { GuiasService } from '../../../services/guias/guias.service';
import { Guias } from '../../../models/guias/guias';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { GuiaComponent } from '../../../components/06-Guias/guia/guia.component';

@Component({
  selector: 'app-guiasmanejo',
  templateUrl: './guiasmanejo.page.html',
  styleUrls: ['./guiasmanejo.page.scss'],
})
export class GuiasmanejoPage implements OnInit {


  guias: Observable<Guias[]>
  guiasFinales: Guias[] = []

  ocultar = ''
  constructor(
    private service: GuiasService,
    public modalController: ModalController
    ) { }

  ngOnInit() {
    this.ocultar = ''
    this.ocultar = 'animated fadeOut fast'
    this.cargar();
  }

  async cargar() {
    this.service.getGuias().subscribe(items => {
      
      this.guiasFinales.push(...items)
    }
    );
  }

  async presentModal(guia:  Guias) {

  
    const modal = await this.modalController.create({
      component: GuiaComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'guia': guia
     

     
      }
    });
    return await modal.present();
  }

}
