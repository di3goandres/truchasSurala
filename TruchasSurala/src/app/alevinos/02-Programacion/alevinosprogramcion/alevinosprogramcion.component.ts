import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { ProgramacionAlevinos } from '../../../models/alevinos/programacion.alevinos';
import { DiaDespachoComponent } from '../../04-DiaDespacho/dia-despacho/dia-despacho.component';
import { A_ProgramacionDiaRequest } from '../../../models/alevinos/alevinos.pedidos';
import { Select } from 'src/app/models/Datos.generales';
import { SeleccionarLoteComponent } from '../../06-Lote/seleccionar-lote/seleccionar-lote.component';
import { ListaConductoresComponent } from '../../../componentes/11-Conductores/01-Lista/lista-conductores/lista-conductores.component';
import { DeseasContinuarComponent } from '../../../componentes/01-Comunes/deseas-continuar/deseas-continuar.component';

@Component({
  selector: 'app-alevinosprogramcion',
  templateUrl: './alevinosprogramcion.component.html',
  styleUrls: ['./alevinosprogramcion.component.css']
})
export class AlevinosprogramcionComponent implements OnInit {
  programacion: ProgramacionAlevinos[];
  seleccionado: ProgramacionAlevinos;
  entrada: AlevinosPedidos[] = [];
  salida: AlevinosPedidos[] = [];
  entradaSinConductor: AlevinosPedidos[] = [];
  salidaConductor: AlevinosPedidos[] = [];
  temporal: AlevinosPedidos[] = [];



  displayedColumns: string[] = ['position', 'FechaSalida', 'Semana',
    'dia', 'estado', 'seleccionar'];
  public dataSource = new MatTableDataSource<ProgramacionAlevinos>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  data = new A_ProgramacionDiaRequest();

  SemanasPedidos: Select[] = [
    { value: '1', viewValue: 'Una Semana' },
    { value: '2', viewValue: 'Dos Semanas' },
    { value: '3', viewValue: 'Tres Semanas' },
    { value: '4', viewValue: 'Cuatro Semanas' },
    { value: '5', viewValue: 'Cinco Semanas' },
    { value: '6', viewValue: 'Seis Semanas' },
    { value: '7', viewValue: 'Siete Semanas' },
    { value: '8', viewValue: 'Ocho Semanas' },
    { value: '9', viewValue: 'Nueve Semanas' },
    { value: '10', viewValue: 'Diez Semanas' },
  ]

  constructor(
    private service: AlevinosService,
    private modalService: NgbModal,
    private changeDetectorRefs: ChangeDetectorRef

  ) {
    this.entradaSinConductor = [];
    this.salidaConductor = [];
  }


  ngOnInit(): void {
    this.seleccionado = new ProgramacionAlevinos();

    this.consultarProgramacion();
  }

  consultarProgramacion() {
    this.salida = []
    this.service.consultarProgramacion().subscribe(
      OK => {


        this.programacion = [];
        this.programacion.push(...OK.programacion);
        if (this.programacion == null || this.programacion.length == 0) {
          this.service.MostrarSnack("Sin datos de programación", "Ok");
        } else {
          let sinprogramar = OK.programacion.filter(item => {
            return item.despachado == true;
          })
          if (sinprogramar.length > 0) {
            this.service.MostrarSnack("Tienes " + sinprogramar.length + ", Programaciones sin despachar. ", "Gracias")

          }


        }
        this.dataSource = new MatTableDataSource(this.programacion);
        this.dataSource.paginator = this.paginator

      },
      ERROR => {
        this.service.NoExitosoComun();

      },
    )


  }

  mostrar() {
    console.log(this.salida);
    this.salida = [];
    this.salida.push(...this.entrada);


  }
  onNotificar(evento) {
    if (evento) {
      this.ConsultarPendientesSemana();
    }

  }

  ConductorNotificar(evento) {
    if (evento) {
      this.ConsultarPendientesSemanaConductor(false);
    }

  }
  onDevolver(evento: AlevinosPedidos) {

    this.ConsultarPendientesSemana();
    // this.changeDetectorRefs.detectChanges();
  }
  onAgregar(evento: AlevinosPedidos) {
    this.ConsultarPendientesSemana();
    // this.changeDetectorRefs.detectChanges();

  }
  Despachar() {
    this.service.MostrarSnack("En este punto puedes despachar los pedidos", "OK")
    this.ConsultarPendientesSemanaConductor(true);

  }

  CambioSemana(s) {
    console.log(this.data);
    this.ConsultarPendientesSemana();
  }

  ConsultarPendientesSemana() {
    this.service.consultarPedidosPendientes(this.data).subscribe(
      OK => {
        console.log(OK)

        this.entrada = [];
        this.salida = [];


        this.entrada.push(...OK.despachados)
        this.salida.push(...OK.Asociados)


        if (this.entrada.length == 0 && this.seleccionado.despachado == false) {
          this.service.MostrarSnack("Para el dia del despacho, en esta semana no hay pedidos, intenta cambiando la semana", "De Acuerdo")
        }
        if(this.seleccionado.despachado){
          this.service.MostrarSnack("Aca puedes ver el pedido despachado", "De Acuerdo")

        }


      },
      ERROR => { console.log(ERROR) },
    )
  }
  verPedidos(informe: ProgramacionAlevinos) {
    this.seleccionado = null;


    this.seleccionado = new ProgramacionAlevinos();

    this.data.idDiaPedido = informe.id;
    this.data.numeroSemana = 0;
    this.seleccionado = informe;

    this.ConsultarPendientesSemana();
    this.stepper.next()

  }
  Agregar() {
    const modalRef = this.modalService.open(DiaDespachoComponent,
      {
        size: 'md',
        windowClass: 'bounce-top'
      });

    modalRef.result.then((result) => {

      if (result == "OK") {
        this.consultarProgramacion();


      }
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  consultarConductores() {
    const modalRef = this.modalService.open(ListaConductoresComponent,
      {
        size: 'lg',
        windowClass: 'bounce-top'
      });

    modalRef.result.then((result) => {

      console.log(result)

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }


  ConsultarPendientesSemanaConductor(next) {
    this.service.consultarPedidosConductor(this.data).subscribe(
      OK => {
        console.log(OK)

        this.entradaSinConductor = [];
        this.salidaConductor = [];

        this.entradaSinConductor.push(...OK.despachados)
        this.salidaConductor.push(...OK.Asociados)
        if (next)
          this.stepper.next()


      },
      ERROR => { console.log(ERROR) },
    )
  }

  DespachoFinal() {
    let sinConductor = this.entradaSinConductor.length;
    let salidaConductor = this.salidaConductor.length;


    if (sinConductor == 0 && salidaConductor == 0) {
      this.service.NoExitoso("Sin Pedidos", "No tienes Pedidos para despachar, por favor asocialos")
    }

    else if (sinConductor > 0 && salidaConductor > 0) {
      this.service.
        NoExitoso("Pedidos Pendientes", "Tienes Pedidos Pendientes, por asociar conductores")
    }
    else if (sinConductor == 0 && salidaConductor > 0) {

      this.DesparcharPedidoActual();
    }


  }


  DesparcharPedidoActual() {
    const modalRef = this.modalService.open(DeseasContinuarComponent,
      {
        size: 'lg',
        windowClass: 'bounce-top'
      });

    modalRef.componentInstance.Titulo = "Despachar";
    modalRef.componentInstance.mensaje = "Esta a punto de despachar los pedido asociados, Desea Continuar?"
    modalRef.result.then((result) => {
      if (result === "OK") {

        this.service.despacharDia(this.seleccionado).subscribe(
          OK => {
            console.log(OK)
            this.service.Exitoso();
            this.consultarProgramacion();
            this.stepper.reset();

          },
          ERROR => {
            console.log(ERROR)
            this.service.NoExitosoComun();

          },
        )


      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
}
