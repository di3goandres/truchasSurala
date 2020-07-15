import { DistribucionGuardar } from './../../../models/distribucion.guardar';
import { DistribucionClass } from './../../../models/distribucion';
import { Pedido } from './../../../models/pedidos';
import { CajaDistribucion, BandejaDistribucion, } from './../../../models/datosDistribucion';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Grupocaja } from '../../../models/datosDistribucion';
import { BandejaGuardar } from '../../../models/distribucion.guardar';
import { UserService } from '../../../service/user/user.service';


@Component({
  selector: 'app-creardistribucion',
  templateUrl: './creardistribucion.component.html',
  styleUrls: ['./creardistribucion.component.css']
})
export class CreardistribucionComponent implements OnInit {

  @Input() cajas: Grupocaja[] = [];
  @Input() bandeja: BandejaDistribucion[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() idCaja: number;
  @Input() pendientes: number;

  cajaActual: CajaDistribucion;
  cajaTotales: CajaDistribucion[] = [];

  dataSource: string[] = ['name', 'age', 'numberPokemons', 'numberBadges', 'edit'];
  bandejaMostrar: BandejaDistribucion[] = [];
  bandejaSeleccionada: BandejaDistribucion;
  valoratomar: number;
  distribucionGuardar: DistribucionGuardar;
  bandejasGuardar: BandejaGuardar[] = [];
  maximo: number;
  @Input() pedido: Pedido;
  ovasPendiente: number;
  colorBandeja = 'defaultClass';

  selected = '0';
  nuevaDistribucion: DistribucionClass;
  title: string;
  constructor(
    private userService: UserService,
    private cdRef: ChangeDetectorRef

    ) { }
  // ngAfterViewChecked()
  // {
  //   console.log( '"! changement de la date du composant !"' );

  //   this.cdRef.detectChanges();
  // }
  ngOnInit(){


  }
  ngAfterContentInit(): void {

    this.valoratomar = 0;
    this.maximo = 0;
    this.title = 'Agregar Distribución';
    this.nuevaDistribucion = new DistribucionClass(0,
      this.pedido.id, this.pedido.id_despacho, '',
      this.pedido.pedido, this.pedido.adicional, this.pedido.reposicion, 0, '', 1, '', '', '');
    this.distribucionGuardar = new DistribucionGuardar(
      this.pedido.id, this.pedido.id_despacho, this.pedido.id_finca, 0,
      // tslint:disable-next-line: new-parens
      this.bandejasGuardar);

    this.cajas.forEach(element => {
      this.cajaTotales.push(...element.cajas);
    });

    this.onChange(this.idCaja);
    this.pendientes = this.pedido.total - this.pendientes;

  }
  agregarCaja() {


    this.cajaActual.habilitado = false;

    let linea = this.cajaActual.linea_genetica;

    let encontrada = this.cajas.find(function (caja){
      return caja.name === linea;
    });

    let indexCaja = this.cajas.indexOf(encontrada);
    let index = encontrada.cajas.indexOf(this.cajaActual);

    encontrada.cajas[index] = this.cajaActual;
    this.cajas[indexCaja] = encontrada;



    this.bandejaMostrar.forEach(element => {
      let calculo = this.pendientes - element.tamanio_final;
      if (this.pendientes > 0) {


        if (calculo > 0) {
          this.bandejasGuardar.push(new BandejaGuardar(
            // tslint:disable-next-line: max-line-length
            element.id, element.tamanio_final, element.id_lote,
            'Caja #' + this.cajaActual.caja_numero, 'Bandeja #' + element.numero_bandeja));
          this.pendientes = this.pendientes - element.tamanio_final;
        } else {
          this.bandejasGuardar.push(new BandejaGuardar(
            // tslint:disable-next-line: max-line-length
            element.id, this.pendientes, element.id_lote,
            'Caja #' + this.cajaActual.caja_numero, 'Bandeja #' + element.numero_bandeja));
          this.pendientes = this.pendientes - this.pendientes;

        }
      }

    });

    this.cajaActual = this.cajaTotales.find(function (actual) {
      return actual.habilitado === true;
    });
    this.idCaja = this.cajaActual.id;
    this.onChange(this.idCaja);
    console.log('datosGuardar', this.bandejasGuardar);
  }

  onChange(id) {
    // tslint:disable-next-line: radix
    id = parseInt(id);

    this.idCaja = id;

    this.cajaActual = this.cajaTotales.find(function (actual) {
      return actual.id === id;
    });

    this.bandejaMostrar = this.bandeja.filter(function (bandejas) {
      return bandejas.id_lote === id;
    });

    console.log('datos mostrados de la caja', this.bandejaMostrar);



  }


  onChangeBandeja(id) {
    // tslint:disable-next-line: radix
    id = parseInt(id);
    console.log('onchange', id);
    this.bandejaSeleccionada = this.bandejaMostrar.find(function (bandejas) {
      return bandejas.id === id;
    });

    this.maximo = this.bandejaSeleccionada.tamanio_final;
    this.colorBandeja = this.setColor(this.maximo);

    const valor = (this.maximo - this.pedido.total) / (this.maximo);
    console.log(valor);
    // if (valor === 1) {
    //   this.valoratomar = 0;

    // } else if (valor >= 0.2 && valor < 0.99) {
    //   this.valoratomar = 0;


    // } else {
    if (this.maximo < (this.pedido.total - this.pendientes)) {
      this.valoratomar = this.maximo; // (this.pedido.total - this.pendientes);

    } else {
      this.valoratomar = (this.pedido.total - this.pendientes);

    }
    // this.valoratomar = (this.pedido.total - this.pendientes);

    // }

  }
  onAdd(formulario) {

    this.distribucionGuardar.bandejas = [] ;

    this.distribucionGuardar.bandejas.push(...this.bandejasGuardar);
    this.bandejasGuardar = []

    let json = JSON.stringify( this.distribucionGuardar);
    console.log('datos', json);

    this.userService.storeDistribucion(this.distribucionGuardar).subscribe(
      response => {
        this.distribucionGuardar.bandejas = [];
        // if (response.status !== 'error') {

          this.passEntry.emit(response);

        // }
      },
      error => {
        console.log('errro guardando...', error);

        this.distribucionGuardar.bandejas = []

      });


  }

  setColor(value) {
    let returnedClass: string = 'defaultClass';

    const valor = (value - this.pedido.total) / (value);

    if (valor === 1) {
      returnedClass = 'notConfirmedClass';

    } else if (valor >= 0.5 && valor < 0.99) {
      returnedClass = 'shippedClass';

    } else {
      returnedClass = 'confirmedClass';
    }
    return returnedClass;
  }

}
