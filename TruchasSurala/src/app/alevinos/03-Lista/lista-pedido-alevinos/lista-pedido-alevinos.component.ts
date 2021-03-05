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

@Component({
  selector: 'app-lista-pedido-alevinos',
  templateUrl: './lista-pedido-alevinos.component.html',
  styleUrls: ['./lista-pedido-alevinos.component.css']
})
export class ListaPedidoAlevinosComponent implements OnInit {
  displayedColumns: string[] = ['position', 'FechaSalida', 'Semana',
    'dia', 'talla', 'peso', 'cantidad'];
  entrada: AlevinosPedidos[] = [];
  @Input() mostrar: boolean;
  @Input() asociar: boolean;

  @Output() datoSalid = new EventEmitter<boolean>();
  @Output() agregar = new EventEmitter<AlevinosPedidos>();
  @Output() devolver = new EventEmitter<AlevinosPedidos>();


  @Input() set id(value: AlevinosPedidos[]) {


    console.log('entre a descargar', this.asociar)
    this.entrada = [];
    this.entrada.push(...value);
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
    if (this.mostrar != null && this.mostrar == true) {
      this.displayedColumns.push(...['Nombre', 'Municipio', 'Direccion', 'Borrar', 'Editar']);
    }
    if (this.asociar != null && this.asociar == true) {
      this.displayedColumns.push(...['asociar']);
    
    }else if(this.asociar == false){
      this.displayedColumns.push(...['desasociar']);
    }

  }

  AsociarLote(item : AlevinosPedidos){
    const modalRef = this.modalService.open(AsignarLoteAlevinosComponent, { size: 'xl', windowClass: 'bounce-in-top'});
    modalRef.componentInstance.entrada = item;
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
  Asociar(element: AlevinosPedidos){
    // this.entrada = this.entrada.filter(item => {
    //   return item.id != element.id
    // })
    this.agregar.emit(element);
    this.dataSource = new MatTableDataSource(this.entrada);
    this.dataSource.paginator = this.paginator;
  }

  Quitar(element: AlevinosPedidos){
    // this.entrada = this.entrada.filter(item => {
    //   return item.id != element.id
    // })
    this.devolver.emit(element);
    this.dataSource = new MatTableDataSource(this.entrada);
    this.dataSource.paginator = this.paginator;
  }
  AbrirEliminar(element) {

    const modalRef = this.modalService.open(DeseasContinuarComponent, { size: 'md', windowClass: 'vibrate-2'});
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

}
