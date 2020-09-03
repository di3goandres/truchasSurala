import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../service/estadistica/estadistica.service';




@Component({
  selector: 'app-cantidaddespachado',
  templateUrl: './cantidaddespachado.component.html',
  styleUrls: ['./cantidaddespachado.component.css']
})
export class CantidaddespachadoComponent implements OnInit {
 mostrar = false;
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fecha';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  single: any[];
  multi: any[];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  constructor(private service: EstadisticaService) {
    // Object.assign(this, { this.single })
  }

  ngOnInit(): void {
    this.service.getEstadisticaMes().subscribe(
      OK => { 
        this.mostrar = true;

        this.single = OK.Mes;
        let data = OK.Mes;

        data.forEach(element => {
          element.name = element.name.substr(0,10 )
        });
        Object.assign(this, { data})

       }
    );
  }

  onSelect(event) {
    console.log(event);
  }

}
