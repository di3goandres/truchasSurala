import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Reportado } from 'src/app/models/mortalidad/mortalidad.reportado.response';
import { AlevinosService } from 'src/app/services/01-Alevinos/alevinos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { MortalidadDetalleComponent } from '../mortalidad-detalle/mortalidad-detalle.component';

@Component({
  selector: 'app-mortalidad-list-reportada',
  templateUrl: './mortalidad-list-reportada.component.html',
  styleUrls: ['./mortalidad-list-reportada.component.scss'],
})
export class MortalidadListReportadaComponent implements OnInit {

  Reportados: Reportado[];
  noMostrar = false;
  constructor(
    private service: PedidosService,
    public modalController: ModalController,
    private serviceAlevinos: AlevinosService,

  ) { }

  ngOnInit() {
    this.traerInformacion();
  }

  traerInformacion() {
    this.service.obtenerReporteMortalidad().subscribe(
      OK => {

        console.log(OK)
        this.Reportados = [];
        this.Reportados.push(...OK.Reportados);
        this.noMostrar = true;

        if (this.Reportados.length == 0) {

          this.serviceAlevinos.ModalSinDatos("Reportes", "En este momento no cuentas con reportes registrados", "pasarela-mortalidad")
        }
      },
      ERROR => { console.log(ERROR) },
    )
  }

  closeItem(item, detalle: Reportado) {
    item.close();
    this.VerDetalle(detalle);
  }

  async VerDetalle(detalle: Reportado) {


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

      });

    return await modal.present();

  }

}
