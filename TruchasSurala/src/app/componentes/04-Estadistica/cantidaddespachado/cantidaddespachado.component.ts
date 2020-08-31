import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../service/estadistica/estadistica.service';


// export var single = [
//   {
//     "name": "Germany",
//     "value": 8940000
//   },
//   {
//     "name": "USA",
//     "value": 5000000
//   },
//   {
//     "name": "France",
//     "value": 7200000
//   }
// ];

// export var multi = [
//   {
//     "name": "Germany",
//     "series": [
//       {
//         "name": "2010",
//         "value": 7300000
//       },
//       {
//         "name": "2011",
//         "value": 8940000
//       }
//     ]
//   },

//   {
//     "name": "USA",
//     "series": [
//       {
//         "name": "2010",
//         "value": 7870000
//       },
//       {
//         "name": "2011",
//         "value": 8270000
//       }
//     ]
//   },

//   {
//     "name": "France",
//     "series": [
//       {
//         "name": "2010",
//         "value": 5000002
//       },
//       {
//         "name": "2011",
//         "value": 5800000
//       }
//     ]
//   }
// ];


@Component({
  selector: 'app-cantidaddespachado',
  templateUrl: './cantidaddespachado.component.html',
  styleUrls: ['./cantidaddespachado.component.css']
})
export class CantidaddespachadoComponent implements OnInit {

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
