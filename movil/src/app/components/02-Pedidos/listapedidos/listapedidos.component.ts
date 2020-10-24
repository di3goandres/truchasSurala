import { Component, OnInit, Input } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { Pedido } from '../../../models/pedidos/pedidos.response';
import { ModalController } from '@ionic/angular';
import { VerfacturaComponent } from '../verfactura/verfactura.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-listapedidos',
  templateUrl: './listapedidos.component.html',
  styleUrls: ['./listapedidos.component.scss'],
})
export class ListapedidosComponent implements OnInit {
  noMostrar = true;
  @Input() idDespacho: any;
  pedidos: Pedido[] = []
  constructor(
    private servicio: PedidosService,
    public modalCtrl: ModalController,
    private storage: Storage,
    
  ) { }

  ngOnInit() {
    this.recargar();
    console.log(this.pedidos)
    if (this.pedidos.length == 0) {
      this.traerPedidos()


    } else {
      this.noMostrar = false;

    }
  }

  async recargar() {
    // this.fincas  = this.storage.get('fincas' )
    let nombre = "pedidos" + this.idDespacho
    this.pedidos = await this.storage.get(nombre) || []


  }
  guardarPedidos() {
    let nombre = "pedidos" + this.idDespacho

    this.storage.set(nombre, this.pedidos)
  }

  async presentModal(pedido: Pedido) {
    const modal = await this.modalCtrl.create({
      component: VerfacturaComponent,
      cssClass: 'update-profile-modal',
      componentProps: {
        'nombreFactura': pedido.nombre_factura,
        'idPedido': pedido.id,
        'pdfSrc': '/api/pedido/factura/'

      }
    });
    return await modal.present();
  }


  traerPedidos() {
    this.servicio.obtenerMisPedidos(this.idDespacho).subscribe(
      OK => {
        this.pedidos = []
        this.pedidos.push(...OK.pedidos)
        this.guardarPedidos()
        this.noMostrar = false;
      },
      ERROR => {
        console.log(ERROR)
        this.noMostrar = false;
        this.recargar()
      }
      ,
    )
  }

  doRefresh(event) {
    this.traerPedidos()


    setTimeout(() => {

      event.target.complete();
    }, 500);
  }

}
