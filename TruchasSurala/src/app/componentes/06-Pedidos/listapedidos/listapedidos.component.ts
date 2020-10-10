import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
import { AsociarfacturaComponent } from '../asociarfactura/asociarfactura.component';
import { Despacho } from 'src/app/models/despacho.response';
import { DespachoResponseActual } from '../../../models/despacho.response';
import { RegistroNoexitosoComponent } from '../../01-Comunes/registro-noexitoso/registro-noexitoso.component';

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
  totaldespacho = 0;
  totalenPedidos = 0;
  totalUsado = 0;

  pedidos: Pedido[] = [];
  id: string;
  constructor(private userService: UserService,
    private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,

  ) { }


  open(): void {

    let sePuede = this.totaldespacho - this.totalenPedidos;
    if (sePuede == 0) {
      const modalRef = this.modalService.open(RegistroNoexitosoComponent);
      modalRef.componentInstance.Titulo = "Cerrado";
      modalRef.componentInstance.mensaje = "Ya se acabaron las Ovas!"
    } else {
      const modalRef = this.modalService.open(CrearpedidosComponent);
      modalRef.componentInstance.idDespacho = this.actual.id;
      modalRef.componentInstance.porcentaje = this.porcentaje
      console.log(this.totaldespacho - this.totalenPedidos);
      modalRef.componentInstance.pendiente = this.totaldespacho - this.totalenPedidos;


      modalRef.result.then((result) => {
        this.refresh();
        this.openExitoso();
      }, (reason) => {




      });
    }

  }

  borrar(element: Pedido) {

    this.pedidosService.borrarTrazabilidadyPedido(element.id).subscribe(
      OK => {
        this.refresh();
        this.openExitoso();
        console.log(OK)
      },
      Error => { console.log(Error) },

    );




  }
  borrarTrazabilida(element: Pedido) {

    this.pedidosService.borrarTrazabilidad(element.id).subscribe(
      OK => {
        this.refresh();
        this.openExitoso();
        console.log(OK)
      },
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


  OpenAsociarFactura(element) {
    const modalRef = this.modalService.open(AsociarfacturaComponent);
    modalRef.componentInstance.pedido = element


    modalRef.result.then((result) => {

      if (result == "OK") {
        this.openExitoso();
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
          this.actual = new Despacho();
          this.actual = response.despacho[0];




          this.totaldespacho = response.total;
          this.totalenPedidos = response.totalPedidos;
          this.totalUsado = response.totalUsado;





          this.porcentaje = response.despacho[0].porcentaje;
          this.dataSource = new MatTableDataSource(this.pedidos);
          this.dataSource.paginator = this.paginator;
        }
      },
      error => { }

    );
  }
  ngOnInit(): void {

    this.refresh()
    // this.traerActual()
  }


  openExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }

}
