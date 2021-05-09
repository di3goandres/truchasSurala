import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte-por-trazabilidad',
  templateUrl: './reporte-por-trazabilidad.page.html',
  styleUrls: ['./reporte-por-trazabilidad.page.scss'],
})
export class ReportePorTrazabilidadPage implements OnInit {

  idPedidoOvas: number

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.cargar();
    console.log(this.idPedidoOvas)
    // this.traerRerporte();
  }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.idPedidoOvas = params.id;
      }
    );
  }

}
