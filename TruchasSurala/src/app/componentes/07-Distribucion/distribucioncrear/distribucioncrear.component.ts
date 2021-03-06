import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DistribucionClass } from '../../../models/distribucion';
import { Grupocaja, BandejaDistribucion, CajaDistribucion } from '../../../models/datosDistribucion';
import { DistribucionGuardar, BandejaGuardar } from '../../../models/distribucion.guardar';
import { Pedido } from '../../../models/pedidos';
import { UserService } from '../../../service/user/user.service';
import { PedidoUnico } from '../../../models/pedido';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-distribucioncrear',
  templateUrl: './distribucioncrear.component.html',
  styleUrls: ['./distribucioncrear.component.css']
})
export class DistribucioncrearComponent implements OnInit {



  @Input() cajas: Grupocaja[] = [];
  @Input() bandeja: BandejaDistribucion[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() idCaja: number = 0;
  @Input() pendientes: number = 0;

  cajaActual: CajaDistribucion;
  cajaTotales: CajaDistribucion[] = [];

  dataSource: string[] = ['name', 'age', 'numberPokemons', 'numberBadges', 'edit'];
  bandejaMostrar: BandejaDistribucion[] = [];
  bandejaSeleccionada: BandejaDistribucion;
  bandejaReingreso: BandejaDistribucion;

  valoratomar: number;
  distribucionGuardar: DistribucionGuardar;
  bandejasGuardar: BandejaGuardar[] = [];
  maximo: number;
  numeroBandejas = "5";

  @Input() pedido: Pedido;
  ovasPendiente: number;
  colorBandeja = 'defaultClass';
  porMaximo = 'true';
  selected = '0';
  nuevaDistribucion: DistribucionClass;
  title: string;
  constructor(
    private userService: UserService,
  
    public activeModal: NgbActiveModal


  ) { }
  // ngAfterViewChecked()
  // {
  //   console.log( '"! changement de la date du composant !"' );

  //   this.cdRef.detectChanges();
  // }
  ngOnInit() {

    console.log(this.pedido)

  }
  salir(){
this.activeModal.close('ok')
  }
  mostrar(value) {
    this.porMaximo = value;

  }
  CambioNumero(value) {
    this.numeroBandejas = value;


  }
  ngAfterContentInit(): void {
    this.pendientes = 0;
    this.valoratomar = 0;
    this.maximo = 0;
    this.title = 'Agregar Distribución';
    this.nuevaDistribucion = new DistribucionClass(0,
      this.pedido.id, this.pedido.id_despacho, '',
      this.pedido.pedido, this.pedido.adicional,
      this.pedido.reposicion, 0, '', 1, '', '', '');
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
  actualizarValorBandeja(actualizas) {

    let index = this.bandeja.indexOf(actualizas);
    this.bandeja[index] = actualizas;
  }
  eliminarCaja(reingresar) {

    this.bandejaReingreso = this.bandeja.find(bandejas => {
      return bandejas.id === reingresar.id_bandeja_lote;
    });

    this.bandejaReingreso.tamanio_final = this.bandejaReingreso.tamanio_final + reingresar.cantidad;
    this.actualizarValorBandeja(this.bandejaReingreso);
    this.cajaTotales.find(function (reingreso) {
      if (reingreso.id === reingresar.id_lote) {
        if (!reingreso.habilitado) {
          reingreso.habilitado = true;
          return;
        }
      }
    });
    this.bandejasGuardar = this.bandejasGuardar.filter(function (obj) {
      return obj.id_bandeja_lote !== reingresar.id_bandeja_lote;
    });
    this.pendientes = this.pendientes + reingresar.cantidad;


  }

  algoCambio() {
    if (this.valoratomar > this.maximo) {

      this.calcularValorAtomar();

    }
  }
  agregarBandeja() {
    console.log(this.maximo)
    console.log(this.valoratomar)


    if (this.pendientes > 0 && this.bandejaSeleccionada.tamanio_final > 0) {

      const element = this.bandejaSeleccionada;
      this.bandejasGuardar.push(new BandejaGuardar(
        element.id,
        this.valoratomar,
        element.id_lote,
        'Caja #' + this.cajaActual.caja_numero,
        'Bandeja #' + element.numero_bandeja));

      this.pendientes = this.pendientes - this.valoratomar;
      this.bandejaSeleccionada.tamanio_final = element.tamanio_final - this.valoratomar;


      this.bandejaReingreso = this.bandeja.find(bandejas => {

        return bandejas.id === element.id;

      });

      this.bandejaReingreso.tamanio_final = this.bandejaSeleccionada.tamanio_final;
      this.actualizarValorBandeja(this.bandejaReingreso);
    }
  }

  agregarCaja() {


    if (this.pendientes > 0 && this.cajaActual.habilitado) {
      this.cajaActual.habilitado = false;
      let linea = this.cajaActual.linea_genetica;
      let encontrada = this.cajas.find(function (caja) {
        return caja.name === linea;
      });
      let indexCaja = this.cajas.indexOf(encontrada);
      let index = encontrada.cajas.indexOf(this.cajaActual);
      encontrada.cajas[index] = this.cajaActual;
      this.cajas[indexCaja] = encontrada;
      this.bandejaMostrar.forEach(element => {
        if (element.tamanio_final > 0) {
          let calculo = this.pendientes - element.tamanio_final;
          if (this.pendientes > 0) {
            if (calculo > 0) {
              this.bandejasGuardar.push(new BandejaGuardar(
                element.id,
                element.tamanio_final,
                element.id_lote,
                'Caja #' + this.cajaActual.caja_numero,
                'Bandeja #' + element.numero_bandeja));
              this.pendientes = this.pendientes - element.tamanio_final;
              element.tamanio_final = element.tamanio_final - element.tamanio_final;
            } else {
              this.bandejasGuardar.push(new BandejaGuardar(
                element.id,
                this.pendientes,
                element.id_lote,
                'Caja #' + this.cajaActual.caja_numero,
                'Bandeja #' + element.numero_bandeja));
              element.tamanio_final = element.tamanio_final - this.pendientes;

              this.pendientes = this.pendientes - this.pendientes;
            }
          }
        }
      });

      this.valoratomar = 0;
      this.cajaActual = this.cajaTotales.find(function (actual) {
        return actual.habilitado === true;
      });
      this.idCaja = this.cajaActual.id;
      this.onChange(this.idCaja);


    }

    console.log('entre')
  }

  onChange(id) {
    id = parseInt(id);
    this.idCaja = id;
    this.cajaActual = this.cajaTotales.find(function (actual) {
      return actual.id === id;
    });
    this.bandejaMostrar = this.bandeja.filter(function (bandejas) {
      return bandejas.id_lote === id;
    });
    this.calcularValorAtomar();


  }

  calcularValorAtomar() {
    const valor = Math.abs((this.maximo - this.pedido.total) / (this.maximo));
    const pendiente = this.pendientes - this.maximo;
    if (valor > 1) {
      this.valoratomar = this.maximo;
    }
    if (pendiente > 0) {
      this.valoratomar = this.maximo;
    } else {
      this.valoratomar = this.maximo - (this.maximo - this.pendientes);
    }
  }

  onChangeBandeja(id) {
    id = parseInt(id);
    this.bandejaSeleccionada = this.bandejaMostrar.find(function (bandejas) {
      return bandejas.id === id;
    });
    this.maximo = this.bandejaSeleccionada.tamanio_final;
    this.colorBandeja = this.setColor(this.maximo);
    this.calcularValorAtomar();

  }
  onAdd(formulario) {
    this.porMaximo
    this.numeroBandejas
    this.distribucionGuardar.bandejas = [];

    this.distribucionGuardar.por_maximo = this.porMaximo == "true" ? true : false;
    this.distribucionGuardar.numero_bandejas_por_trazabilidad = parseInt(this.numeroBandejas);


    this.distribucionGuardar.bandejas.push(...this.bandejasGuardar);
    this.bandejasGuardar = []

    console.log(this.distribucionGuardar)
    this.userService.storeDistribucion(this.distribucionGuardar).subscribe(
      response => {
        this.distribucionGuardar.bandejas = [];
        this.passEntry.emit(response);
      },
      error => {
        console.log(error);
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
