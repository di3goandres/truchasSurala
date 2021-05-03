import { Component, OnInit } from '@angular/core';
import { ok } from 'assert';
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
    private service: PedidosService
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
  closeItem(item) {
    item.close();
  }
}
