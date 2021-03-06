import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NumberCardComponent } from '@swimlane/ngx-charts';
import { ReporteAlevinos } from 'src/app/models/alevinos/alevinos.informe';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';

@Component({
  selector: 'app-informe-pedido',
  templateUrl: './informe-pedido.component.html',
  styleUrls: ['./informe-pedido.component.css']
})
export class InformePedidoComponent implements OnInit {



   _idReporte: number;

  @Input() set idReporte(value: number) {
    this._idReporte = value
    if(value>0)
      this.traerRerporte();

  }
  reporte: ReporteAlevinos= new ReporteAlevinos();
  constructor(
    private route: ActivatedRoute,
    private service: AlevinosService) { }

  ngOnInit(): void {
    // this.idReporte = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.traerRerporte();
  }

  traerRerporte() {
    this.service.GetReporte(this._idReporte).subscribe(
      OK => {
        console.log(OK)

        if (OK.code == 200) {
          this.reporte = new ReporteAlevinos();
          this.reporte = OK.reporte
        }
      },
      ERROR => { console.log(ERROR) },
    )
  }
}
