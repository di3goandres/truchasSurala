import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { DatoEstadistica, Estadistica } from '../../../models/pedidos/estadistica.response';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  datos: DatoEstadistica[] = []
  datoEdad: Estadistica[] = []
  datoTamanio: Estadistica[] = []
  mostrar = false;
  view: any[] = [300, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Fecha';
  showYAxisLabel = true;
  yAxisLabel = 'Edad';
  ytamanioAxisLabel = 'Tamaño';

  single: any[];
  tamanio: any[];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }



  mySubscription: any;

  constructor(private pedidosService: PedidosService) { }

  @HostListener('unloaded')
  ngOnDestroy(): void {

    console.log('Items destroyed estadistica');
    if (this.mySubscription) {


      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {
    console.log('entre')
    this.traerEstadistica();
  }

  ionViewDidEnter() {
    console.log('entre ionViewDidEnter Estadistica');
    // this.traerFincas();
    this.traerEstadistica();


  }
  traerEstadistica() {
    this.pedidosService.obtenerEstadistica().subscribe(
      OK => {
        console.log(OK)
        this.datos = [];
        this.datos.push(...OK.datos);
        this.datos.forEach(item => {

          let fecha = item.fecha_salida.substr(0,10);
          this.datoEdad.push(new Estadistica
            (item.edad_tcu, fecha))

          this.datoTamanio.push(new Estadistica
            (item.tamanio, fecha))

        }

        )
        this.tamanio = this.datoTamanio
        this.single = this.datoEdad;

        // Object.assign(this, { dato });
      },
      ERROR => { console.log(ERROR) },
    )
  }

  cuadrarDatos() {

  }
}
