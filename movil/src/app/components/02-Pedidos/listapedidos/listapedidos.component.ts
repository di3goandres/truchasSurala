import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { Pedido } from '../../../models/pedidos/pedidos.response';
import { ModalController } from '@ionic/angular';
import { VerfacturaComponent } from '../verfactura/verfactura.component';

@Component({
  selector: 'app-listapedidos',
  templateUrl: './listapedidos.component.html',
  styleUrls: ['./listapedidos.component.scss'],
})
export class ListapedidosComponent implements OnInit {

  pedidos: Pedido[]= []
  constructor(
    private servicio : PedidosService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
   this.traerPedidos()
  }

  async presentModal(pedido: Pedido) {
    const modal = await this.modalCtrl.create({
      component: VerfacturaComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'nombreFactura': pedido.nombre_factura
      }
    });
    return await modal.present();
  }
 
 
  traerPedidos(){
    this.servicio.obtenerMisPedidos().subscribe(
      OK => {
        this.pedidos.push(...OK.pedidos)
      },
      ERROR => console.log(ERROR),
    )
  }

  doRefresh(event) {
    this.traerPedidos()
   

    setTimeout(() => {
     
      event.target.complete();
    }, 2000);
  }

}
