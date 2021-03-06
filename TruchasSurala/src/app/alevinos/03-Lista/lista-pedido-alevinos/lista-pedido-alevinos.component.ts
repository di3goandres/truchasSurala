import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { DeseasContinuarComponent } from '../../../componentes/01-Comunes/deseas-continuar/deseas-continuar.component';
import { EditarMontajeComponent } from '../../01-Montaje/editar-montaje/editar-montaje.component';
import { AsignarLoteAlevinosComponent } from '../../06-Lote/asignar-lote-alevinos/asignar-lote-alevinos.component';
import { VerCertificadoOrigenComponent } from '../../06-Lote/ver-certificado-origen/ver-certificado-origen.component';
import { ListaConductoresComponent } from '../../../componentes/11-Conductores/01-Lista/lista-conductores/lista-conductores.component';
import { AsignarConductorComponent } from '../../07-AsignarConductor/asignar-conductor/asignar-conductor.component';
import { InformePedidoComponent } from '../../05-Clientes/informe-pedido/informe-pedido.component';

@Component({
  selector: 'app-lista-pedido-alevinos',
  templateUrl: './lista-pedido-alevinos.component.html',
  styleUrls: ['./lista-pedido-alevinos.component.css']
})
export class ListaPedidoAlevinosComponent implements OnInit {
  displayedColumnsIniciales: string[] = ['position', 'FechaSalida',
    'dia', 'talla', 'peso', 'cantidad'];
  displayedColumns: string[] = [];
  entrada: AlevinosPedidos[] = [];
  _despacho: number

  _habilitado: boolean;


  @Input() mostrar: boolean;
  @Input() asociar: boolean;

  @Input() conductor: boolean;
  @Input() set habilitado(value: number) {
    this._habilitado = value == 1 ? true : false;
    console.log('entre de valor:', this._habilitado)
    this.asociarItems();

  }



  @Output() datoSalid = new EventEmitter<boolean>();
  @Output() verInforme = new EventEmitter<AlevinosPedidos>();

  @Output() agregar = new EventEmitter<AlevinosPedidos>();
  @Output() devolver = new EventEmitter<AlevinosPedidos>();

  @Input() set despacho(value: number) {

    this._despacho = 0
    this._despacho = value;

  }

  @Input() set id(value: AlevinosPedidos[]) {

    this.entrada = [];
    if (value != null) {
      this.entrada.push(...value);

    } else {

    }
    this.dataSource = new MatTableDataSource(this.entrada);
    this.dataSource.paginator = this.paginator;
  }

  public dataSource = new MatTableDataSource<AlevinosPedidos>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(

    private modalService: NgbModal,
    private service: AlevinosService

  ) {

  }

  ngOnInit(): void {
    this.asociarItems();
  }

  asociarItems() {
    this.displayedColumns = []
    this.displayedColumns.push(...this.displayedColumnsIniciales);
    if (this.mostrar != null) {
      this.displayedColumns.push(...['Nombre', 'Municipio', 'Direccion']);
    }
    if (this.mostrar != null && this.mostrar == true) {
      this.displayedColumns.push(...['Borrar', 'Editar']);
    }
    if (this.asociar != null && this.asociar == true) {
      this.displayedColumns.push(...['asociar']);

    } else if (this.asociar == false) {

      if (this.conductor != null && this.conductor == true) {

        this.displayedColumns.push(...['NombreConductor', 'Conductor']);

      } else if (this.conductor != null && this.conductor == false) {
        this.displayedColumns.push(...['Conductor']);

      }

      this.displayedColumns.push(...['desasociar', 'verCertificado']);

    }
    if (this._habilitado == true) {
      this.deleteMsg('desasociar');
      this.deleteMsg('asociar');
      this.deleteMsg('Conductor');
      this.displayedColumns.push('VerInforme');
    }
  }
  deleteMsg(msg: string) {

    this.displayedColumns = this.displayedColumns.filter(item => item !== msg);
    console.log(msg);
  }


  VerInforme(item: AlevinosPedidos) {
    this.verInforme.emit(item);
  }
  VerCertificado(item: AlevinosPedidos) {
    const modalRef = this.modalService.open(VerCertificadoOrigenComponent, { size: 'xl', windowClass: 'bounce-in-top' });
    modalRef.componentInstance.Despacho = item

    modalRef.result.then((result) => {
      if (result === "OK") {
        this.Asociar(item)

      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
  AsociarLote(item: AlevinosPedidos) {
    const modalRef = this.modalService.open(AsignarLoteAlevinosComponent, { size: 'xl', windowClass: 'bounce-in-top' });
    modalRef.componentInstance.entrada = item;
    modalRef.componentInstance.Despacho = this._despacho;

    modalRef.result.then((result) => {
      if (result === "OK") {
        this.Asociar(item)

      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
  Asociar(element: AlevinosPedidos) {
    // this.entrada = this.entrada.filter(item => {
    //   return item.id != element.id
    // })
    this.agregar.emit(element);
    this.dataSource = new MatTableDataSource(this.entrada);
    this.dataSource.paginator = this.paginator;
  }

  Quitar(element: AlevinosPedidos) {

    const modalRef = this.modalService.open(DeseasContinuarComponent, { size: 'md', windowClass: 'vibrate-2' });
    modalRef.componentInstance.Titulo = "Devolver";
    modalRef.componentInstance.mensaje = "Esta a punto de devolver un pedido, Desea Continuar?"
    modalRef.result.then((result) => {
      if (result === "OK") {

        this.service.desAsociarPedido(element).subscribe(
          OK => {
            console.log(OK)
            this.service.Exitoso();
            this.devolver.emit(element);
            this.dataSource = new MatTableDataSource(this.entrada);
            this.dataSource.paginator = this.paginator;
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
  AbrirEliminar(element) {

    const modalRef = this.modalService.open(DeseasContinuarComponent, { size: 'md', windowClass: 'vibrate-2' });
    modalRef.componentInstance.Titulo = "Eliminar";
    modalRef.componentInstance.mensaje = "Esta a punto de eliminar un pedido, Desea Continuar?"
    modalRef.result.then((result) => {
      if (result === "OK") {

        this.eliminar(element.id);
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  AbrirEditar(element) {

    const modalRef = this.modalService.open(EditarMontajeComponent, { size: 'md', windowClass: 'bounce-top' });
    modalRef.componentInstance.entrada = element

    modalRef.result.then((result) => {
      if (result === "OK") {

        // this.eliminar(element.id);
        this.datoSalid.emit(true);
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  eliminar(id) {
    this.service.borrarPedidosUsuario(id).subscribe(
      OK => {
        console.log(OK);
        this.service.Exitoso();
        this.datoSalid.emit(true);


      },
      ERROR => { console.log(ERROR); },
    )
  }

  consultarConductores(pedidoAlevinos: AlevinosPedidos) {
    const modalRef = this.modalService.open(AsignarConductorComponent,
      {
        size: 'lg',
        windowClass: 'bounce-top'
      });
    modalRef.componentInstance.entrada = pedidoAlevinos

    modalRef.result.then((result) => {
      if (result === "OK") {
        this.datoSalid.emit(true);
      }
      console.log(result)

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

}
