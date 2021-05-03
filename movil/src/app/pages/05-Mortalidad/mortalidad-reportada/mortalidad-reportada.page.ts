import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MortalidadDetalleComponent } from 'src/app/components/04-Mortalidad/mortalidad-detalle/mortalidad-detalle.component';
import { Reportado } from 'src/app/models/mortalidad/mortalidad.reportado.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-mortalidad-reportada',
  templateUrl: './mortalidad-reportada.page.html',
  styleUrls: ['./mortalidad-reportada.page.scss'],
})
export class MortalidadReportadaPage implements OnInit {
  Reportados: Reportado[];

  constructor(
    private service: PedidosService,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
    // this.traerInformacion();
  }

  traerInformacion() {
    this.service.obtenerReporteMortalidad().subscribe(
      OK => {

        console.log(OK)
        this.Reportados = [];
        this.Reportados.push(...OK.Reportados);

      },
      ERROR => { console.log(ERROR) },
    )
  }
  closeItem(item, detalle:Reportado ) {
    item.close();
    this.VerDetalle(detalle);
  }

  async VerDetalle(detalle:Reportado) {


    const modal = await this.modalController.create({
      component: MortalidadDetalleComponent,
      cssClass: 'my-custom-class',
      componentProps: {
         'detalle': detalle
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data.role);
        // if (data.role == "OK")
          // this.router.navigate(['/mortalidadpedidos/1']);
      });
    // const { data } = await modal.onWillDismiss();

    return await modal.present();

  }
}
