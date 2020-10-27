import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { InformeTecnico } from '../../../models/pedidos/informes.tecnicos.response';
import { ModalreporteComponent } from '../modalreporte/modalreporte.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-listareportestecnicos',
  templateUrl: './listareportestecnicos.component.html',
  styleUrls: ['./listareportestecnicos.component.scss'],
})
export class ListareportestecnicosComponent implements OnInit {

  informes: InformeTecnico[];

  constructor(
    private service: PedidosService,
    public modalController: ModalController

  ) { }

  ngOnInit() {

    this.cargarInformesTecnicos()
  }


  cargarInformesTecnicos() {
    this.service.ObtenerReportesTecnicos().subscribe(
      OK => {
        console.log(OK)
        this.informes = [];
        this.informes.push(...OK.informes)
      },
      ERROR => { console.log(ERROR) },
    )
  }

  async leer(item: InformeTecnico) {


    const modal = await this.modalController.create({
      component: ModalreporteComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'informe': item



      }
    });
    return await modal.present();
  }

}
