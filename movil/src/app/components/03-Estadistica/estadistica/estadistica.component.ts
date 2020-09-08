import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { DatoEstadistica, Estadistica, EstadisticaMulti } from '../../../models/pedidos/estadistica.response';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
  datos: DatoEstadistica[] = []
  datoEdad: Estadistica[] = []
  datoTamanio: Estadistica[] = []
  datoMulti: EstadisticaMulti[] = []

  mostrar = false;
  view: any[] = [450, 450];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fecha';
  showYAxisLabel = true;
  yAxisLabel = 'Dato';
  ytamanioAxisLabel = 'Tamaño';
  timeline: boolean = true;

  single: any[];
  tamanio: any[];
  multi: any[];

  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }



  mySubscription: any;

  constructor(private pedidosService: PedidosService) { }

  doRefresh(event) {
    
    this.single= [];
    this.tamanio=[];
    this.multi=[];
    this.traerEstadistica();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  // @HostListener('unloaded')
  // ngOnDestroy(): void {

  //   console.log('Items destroyed estadistica');
  //   if (this.mySubscription) {


  //     this.mySubscription.unsubscribe();
  //   }
  // }

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

          let fecha = item.fecha_salida.substr(0, 10);
          this.datoEdad.push(new Estadistica
            (item.edad_tcu, fecha))

          this.datoTamanio.push(new Estadistica
            (item.tamanio, fecha))

        });
        this.datoMulti = []
        this.datoMulti.push(new EstadisticaMulti(this.datoTamanio,"Tamaño(ml)"))
        this.datoMulti.push(new EstadisticaMulti(this.datoEdad,"Edad (TCU)"))


        this.tamanio = this.datoTamanio
        this.single = this.datoEdad;
        this.multi = this.datoMulti;

        console.log(this.multi)


        // Object.assign(this, { dato });
      },
      ERROR => { console.log(ERROR) },
    )
  }

  cuadrarDatos() {

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
