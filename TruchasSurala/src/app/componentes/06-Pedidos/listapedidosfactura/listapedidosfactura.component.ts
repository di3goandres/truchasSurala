import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Despacho } from 'src/app/models/despacho';
import { Pedido } from 'src/app/models/pedidos';
import { UserService } from 'src/app/service/user/user.service';
import { PedidosService } from 'src/app/service/pedidos/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearpedidosComponent } from '../crearpedidos/crearpedidos.component';
import { BorrarpedidoComponent } from '../borrarpedido/borrarpedido.component';
import { AsociarfacturaComponent } from '../asociarfactura/asociarfactura.component';
import { EditarpedidoComponent } from '../editarpedido/editarpedido.component';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';

@Component({
  selector: 'app-listapedidosfactura',
  templateUrl: './listapedidosfactura.component.html',
  styleUrls: ['./listapedidosfactura.component.css']
})
export class ListapedidosfacturaComponent implements OnInit {

  porcentaje = "0"
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'usuario', 'NombreFinca',
    'Pedido', 'Porcentaje',
    'adicionales', 'reposicion', 'totalPedido',
    'FechaCreacion', 'Factura'];
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
    const modalRef = this.modalService.open(AsociarfacturaComponent, { size: 'lg' });
    modalRef.componentInstance.pedido = element


    modalRef.result.then((result) => {
      this.refresh();
      this.openExitoso();

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
