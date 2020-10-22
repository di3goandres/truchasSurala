import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { DatoEstadistica, Estadistica, EstadisticaMulti } from '../../../models/pedidos/estadistica.response';
import { Storage } from '@ionic/storage';


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
  view: any[] = [400, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fecha';
  showYAxisLabel = true;
  yAxisLabel = '';
  ytamanioAxisLabel = 'Tamaño';
  timeline: boolean = true;

  single: any[];
  tamanio: any[];
  multi: any[] = [];

  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }



  ionViewWillEnter() {
    this.single = [];
    this.tamanio = [];
    this.multi = [];
    this.traerEstadistica();
  }
  mySubscription: any;

  constructor(private pedidosService: PedidosService,
    private storage: Storage,
 
  ) {

    this.view = [innerWidth / 1.2, 400];
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.25, 400];
    console.log(event.target.innerWidth)
  }
  doRefresh(event) {

    this.traerEstadistica();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  ngOnInit() {
    this.recargar()
    if (this.multi.length == 0) {
      this.traerEstadistica();

    }
  }




  async recargar() {
    // this.fincas  = this.storage.get('fincas' )
    this.multi = await this.storage.get('estadistica') || []


  }
  guardarEstadistica() {
    this.storage.set('estadistica', this.multi);
  }
  traerEstadistica() {
    this.pedidosService.obtenerEstadistica().subscribe(
      OK => {

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
        this.datoMulti.push(new EstadisticaMulti(this.datoTamanio, "Tamaño(mm)"))
        this.datoMulti.push(new EstadisticaMulti(this.datoEdad, "Edad (TCU)"))


        this.tamanio = this.datoTamanio
        this.single = this.datoEdad;
        this.multi = this.datoMulti;
        this.guardarEstadistica();


      },
      ERROR => {
        console.log(ERROR)
        this.recargar();

        if (ERROR.message == "Usuario no identificado") {
          this.pedidosService.responseError()
        }


      }
      ,
    )
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
