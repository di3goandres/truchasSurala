import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedidos/pedidos.response';
import { ReporteConteoService } from '../../../services/02-ReporteConteo/reporte-conteo.service';

@Component({
  selector: 'app-conteo-disponible',
  templateUrl: './conteo-disponible.component.html',
  styleUrls: ['./conteo-disponible.component.scss'],
})
export class ConteoDisponibleComponent implements OnInit {

 
  noMostrar = false;
  pedidos: Pedido[] = []
  constructor(
    private servicio: ReporteConteoService,

  ) { }

  ngOnInit() {
    this.cargar()
  }

  async cargar() {

    await this.servicio.ConteoPedidosUsuario().subscribe(
      OK => {
        this.pedidos = [];
        this.pedidos.push(...OK.pedidos)
        this.noMostrar = true
        if(this.pedidos.length==0){
          this.servicio.ModalSinDatos("Pedidos", "No Tienes pedidos al cual hacer un reclamo, recuerda que es máximo dos dias", "pasarela-conteo")
        }
      },
      ERROR => { console.log(ERROR) },
    )
  }

  doRefresh(event) {
    this.cargar()
  }

  closeItem(item, detalle:Pedido ) {
    item.close();
    this.VerDetalle(detalle);
  }


  async VerDetalle(detalle:Pedido) {


    // const modal = await this.modalController.create({
    //   component: MortalidadDetalleComponent,
    //   cssClass: 'my-custom-class',
    //   componentProps: {
    //      'detalle': detalle
    //   }
    // });

    // modal.onDidDismiss()
    //   .then((data) => {
    //     console.log(data.role);
    //     // if (data.role == "OK")
    //       // this.router.navigate(['/mortalidadpedidos/1']);
    //   });
    // // const { data } = await modal.onWillDismiss();

    // return await modal.present();

  }
}
