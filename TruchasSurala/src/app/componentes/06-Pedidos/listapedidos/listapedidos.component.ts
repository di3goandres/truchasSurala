import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Despacho } from '../../../models/despacho';
import { Pedido } from '../../../models/pedidos';
import { UserService } from 'src/app/service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearpedidosComponent } from '../crearpedidos/crearpedidos.component';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';
import { EditarpedidoComponent } from '../editarpedido/editarpedido.component';
import { MatPaginator } from '@angular/material/paginator';
import { BorrarpedidoComponent } from '../borrarpedido/borrarpedido.component';
import { PedidosService } from '../../../service/pedidos/pedidos.service';

@Component({
  selector: 'app-listapedidos',
  templateUrl: './listapedidos.component.html',
  styleUrls: ['./listapedidos.component.css']
})
export class ListapedidosComponent implements OnInit {

  porcentaje = "0"
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'usuario', 'NombreFinca',
    'Pedido', 'Porcentaje',
    'adicionales', 'reposicion', 'totalPedido',
    'FechaCreacion', 'Actualizar', 'VerGenerar', 'Borrar', 'reiniciar'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  actual: Despacho;

  pedidos: Pedido[] = [];
  id: string;
  constructor(private userService: UserService,
    private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,

  ) { }


  open(): void {
    const modalRef = this.modalService.open(CrearpedidosComponent);
    modalRef.componentInstance.idDespacho = this.actual.id;
    modalRef.componentInstance.porcentaje = this.porcentaje

    modalRef.result.then((result) => {
      this.refresh();
      this.openExitoso();
    }, (reason) => {




    });
  }

  borrar(element: Pedido) {
  
      this.pedidosService.borrarTrazabilidadyPedido(element.id).subscribe(
        OK => { 
          this.refresh();
          this.openExitoso();
          console.log(OK) },
        Error => { console.log(Error) },

      );
    
    
    

  }
  borrarTrazabilida(element: Pedido) {
  
      this.pedidosService.borrarTrazabilidad(element.id).subscribe(
        OK => { 
          this.refresh();
          this.openExitoso();
          console.log(OK) },
        Error => { console.log(Error) },

      );
    
    
    

  }
  OpenBorrar(element) {
    const modalRef = this.modalService.open(BorrarpedidoComponent);
    modalRef.componentInstance.pedido = element
     modalRef.componentInstance.borrarPedido = true

    modalRef.result.then((result) => {
      if (result === "BORRAR") {
        this.borrar(element);
      
      }

    }, (reason) => {

    });

  }
  OpenBorrarTrazabilidad(element) {
    const modalRef = this.modalService.open(BorrarpedidoComponent);
    modalRef.componentInstance.pedido = element
     modalRef.componentInstance.borrarPedido = false

    modalRef.result.then((result) => {
      if (result === "BORRAR") {
      
        this.borrarTrazabilida(element);
      
      }

    }, (reason) => {

    });

  }
  OpenActualzar(element) {
    const modalRef = this.modalService.open(EditarpedidoComponent);
    modalRef.componentInstance.pedido = element
    // modalRef.componentInstance.porcentaje = this.porcentaje

    modalRef.result.then((result) => {
      this.refresh();
      this.openExitoso();
    }, (reason) => {

    });
  }
  refresh() {
    this.id = this.route.snapshot.paramMap.get('id');



    if (this.id == null) {
      this.router.navigate(['/surala/error']);
      return;
    }
    this.userService.getPedidos(this.id).subscribe(
      response => {
        console.log(response)
        if (response.status === 'success') {
          this.pedidos = [];
          if (response.pedido.length !== 0) {
            this.pedidos.push(...response.pedido);

          }
          this.dataSource = new MatTableDataSource(this.pedidos);
          this.dataSource.paginator = this.paginator;
        }
      },
      error => { }

    );
  }
  ngOnInit(): void {

    this.refresh()
    this.traerActual()
  }

  traerActual() {
    this.userService.getDespachoActual().subscribe(
      response => {
        if (response.status === "OK") {
          if (response.despacho.length > 0) {

            this.actual = new Despacho();
            this.actual.id = response.despacho[0].id;

            this.porcentaje = response.despacho[0].porcentaje;
          }
        }
      }

    );
  }
  openExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }

}
