import { Component, Input, OnInit } from '@angular/core';
import { ReporteConteoService } from 'src/app/services/02-ReporteConteo/reporte-conteo.service';
import { ConteoTrazabilidadResponse, MetodoConteo } from '../../../models/conteo/conteo.trazabilida';

@Component({
  selector: 'app-lista-trazabilidad-reporte',
  templateUrl: './lista-trazabilidad-reporte.component.html',
  styleUrls: ['./lista-trazabilidad-reporte.component.scss'],
})
export class ListaTrazabilidadReporteComponent implements OnInit {
  Metodo: number;
  idPedidoOvas: number;
  mostrar = true;

  ConteoTrazabilidad: ConteoTrazabilidadResponse[];
  metodoConteo:       MetodoConteo[];
  @Input() set id(value: number) {
    this.idPedidoOvas = value;
    this.traerInformacion();
  }
  constructor(
    private servicio: ReporteConteoService,

  ) { }

  ngOnInit() { }

  traerInformacion() {
    this.servicio.GetTrazabilidad(this.idPedidoOvas).subscribe(
      OK => {
        console.log(OK)

         this.metodoConteo = [];
         this.metodoConteo.push(...OK.metodoConteo) 
         this.mostrar = false
      },
      ERROR => {
        console.log(ERROR)
        this.mostrar = false
      },
    )
  }

  onSelectChange(selection:any){
    console.log('Selected', selection.detail.value, this.Metodo)
  }

}
