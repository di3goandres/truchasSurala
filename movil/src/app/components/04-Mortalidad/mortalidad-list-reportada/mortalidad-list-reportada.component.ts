import { Component, OnInit } from '@angular/core';
import { Reportado } from 'src/app/models/mortalidad/mortalidad.reportado.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-mortalidad-list-reportada',
  templateUrl: './mortalidad-list-reportada.component.html',
  styleUrls: ['./mortalidad-list-reportada.component.scss'],
})
export class MortalidadListReportadaComponent implements OnInit {

  Reportados: Reportado[];

  constructor(
    private service: PedidosService
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

      },
      ERROR => { console.log(ERROR) },
    )
  }
  closeItem(item) {
    item.close();
  }

}
