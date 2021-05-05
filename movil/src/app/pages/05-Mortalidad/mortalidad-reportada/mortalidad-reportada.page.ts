import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MortalidadDetalleComponent } from 'src/app/components/04-Mortalidad/mortalidad-detalle/mortalidad-detalle.component';
import { Reportado } from 'src/app/models/mortalidad/mortalidad.reportado.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { AlevinosService } from '../../../services/01-Alevinos/alevinos.service';

@Component({
  selector: 'app-mortalidad-reportada',
  templateUrl: './mortalidad-reportada.page.html',
  styleUrls: ['./mortalidad-reportada.page.scss'],
})
export class MortalidadReportadaPage implements OnInit {
  Reportados: Reportado[];

  constructor(
    private service: PedidosService,
    private serviceAlevinos: AlevinosService,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
    // this.traerInformacion();
  }

  
}
