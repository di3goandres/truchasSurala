import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlevinosPedidos } from 'src/app/models/alevinos/alevinos.pedidos';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { DeseasContinuarComponent } from '../../../componentes/01-Comunes/deseas-continuar/deseas-continuar.component';
import { EditarMontajeComponent } from '../../01-Montaje/editar-montaje/editar-montaje.component';

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
  @Output() datoSalid = new EventEmitter<boolean>();
  @Input() set id(value: AlevinosPedidos[]) {


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
    if (this.mostrar != null) {
      this.displayedColumns.push(...['Nombre', 'Municipio', 'Direccion', 'Borrar', 'Editar']);
    }

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
