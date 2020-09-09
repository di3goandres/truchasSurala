import { Component, OnInit, Input } from '@angular/core';
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

  @Input() idDespacho : any;
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
    this.servicio.obtenerMisPedidos(this.idDespacho).subscribe(
      OK => {
        this.pedidos = []
        this.pedidos.push(...OK.pedidos)
        console.log(OK.pedidos)
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
