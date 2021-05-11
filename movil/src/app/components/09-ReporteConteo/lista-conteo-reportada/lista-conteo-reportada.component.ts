import { Component, OnInit } from '@angular/core';
import { Reportado } from 'src/app/models/mortalidad/mortalidad.reportado.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ModalController } from '@ionic/angular';
import { AlevinosService } from 'src/app/services/01-Alevinos/alevinos.service';
import { MortalidadDetalleComponent } from '../../04-Mortalidad/mortalidad-detalle/mortalidad-detalle.component';
import { ReporteConteoService } from 'src/app/services/02-ReporteConteo/reporte-conteo.service';

@Component({
  selector: 'app-lista-conteo-reportada',
  templateUrl: './lista-conteo-reportada.component.html',
  styleUrls: ['./lista-conteo-reportada.component.scss'],
})
export class ListaConteoReportadaComponent implements OnInit {

  Reportados: Reportado[];
  noMostrar=false;
  constructor(
    private service: ReporteConteoService,
    public modalController: ModalController,
    private serviceAlevinos: AlevinosService,

  ) { }

  ngOnInit() {
    this.traerInformacion();
  }

  traerInformacion() {
    this.service.obtenerReporteConteo().subscribe(
      OK => {

        console.log(OK)
        this.Reportados = [];
        this.Reportados.push(...OK.Reportados);
        this.noMostrar=true;
        if (this.Reportados.length == 0) {

          this.serviceAlevinos.ModalSinDatos("Reportes", "En este momento no cuentas con reportes registrados", "pasarela-conteo")
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
