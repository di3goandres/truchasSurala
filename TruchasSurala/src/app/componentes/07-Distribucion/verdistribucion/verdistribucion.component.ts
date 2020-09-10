import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistribucionResponse, InfoR, MostrarDistribucionTotal } from '../../../models/distribucion.response';
import { BandejaDistribucion, Grupocaja } from '../../../models/datosDistribucion';
import { PedidoUnico } from '../../../models/pedido';
import { UserService } from '../../../service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreardistribucionComponent } from '../../distribucion/creardistribucion/creardistribucion.component';
import { NestedTreeControl } from '@angular/cdk/tree';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';

@Component({
  selector: 'app-verdistribucion',
  templateUrl: './verdistribucion.component.html',
  styleUrls: ['./verdistribucion.component.css']
})
export class VerdistribucionComponent implements OnInit {

  //*** data de las listas */


  distribuciontotal: MostrarDistribucionTotal[] = []

  displayedColumns: string[] = ['position', 'Cantidad', 'Bandeja'];
  treeControl = new NestedTreeControl<InfoR>(node => node.childrend);
  dataSource: InfoR[] = []

  /** fin */

  id: string;
  distribuciones: DistribucionResponse

  bandeja: BandejaDistribucion[] = [];
  cajas: Grupocaja[] = [];
  agregados: number;


  pedido: PedidoUnico;
  mostrar: boolean;
  constructor(

    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal

  ) { }

  // ngAfterViewChecked()
  // {
  //   console.log( '"! changement de la date du composant !"' );

  //   this.cdRef.detectChanges();
  // }
  ngOnInit(): void {
    this.mostrar = false;
    //este es el id del pedido
    this.id = this.route.snapshot.paramMap.get('id');

    this.obtenerListaDistribucion();
    this.obtenerPedido();
  }

  // tslint:disable-next-line: typedef


  // tslint:disable-next-line: typedef
  private obtenerPedido() {
    this.userService.getPedidoActual(this.id).subscribe(
      response => {

        if (response.status !== 'error') {
          this.pedido = response.pedido;
          if (!this.pedido.genero_trazabilidad) {
            this.obtenerDatos();

          }

        }
      },
      error => { });
  }



  calcularCajas() {
    let children: InfoR[] = [];
    let Todos: InfoR[] = [];
    let index = 1;
    this.distribuciones.distribucion.forEach(item => {
      item.InfoDespacho.forEach(element => {
        children.push(
          new InfoR(
            element.Cantidad,
            element.caja_numero,
            element.bandeja_numero,
            element.ovas_ml))
      });

      Todos.push(new InfoR(item.contacto.Total_enviado, 0, 0, 0, children));
      children = [];





    });

    console.log(Todos);
    this.dataSource = Todos;


  }

  private obtenerListaDistribucion() {
    this.userService.getDistribucion(this.id).subscribe(
      response => {


        console.log('En lista', response);

        if (response.status !== 'error') {
          this.distribuciones = response

          if (this.distribuciones.distribucion.length > 0) { this.calcularCajas() }
          console.log('Distribuciones', this.distribuciones)
        }



      },
      error => { });
  }
  // tslint:disable-next-line: typedef
  private obtenerDatos() {
    this.userService.getDatosDistribucion(this.pedido.id_despacho).subscribe(
      response => {

        if (response.status !== 'error') {
          this.cajas = [];
          this.bandeja = [];
          this.cajas.push(...response.grupocajas);
          this.bandeja.push(...response.bandejas);



          console.log('cajas', this.cajas)



        }
      },
      error => { });
  }

  openExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }
  open(): void {
    const modalRef = this.modalService
      .open(CreardistribucionComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pedido = this.pedido;
    modalRef.componentInstance.bandeja = this.bandeja;
    modalRef.componentInstance.cajas = this.cajas;
    modalRef.componentInstance.pendientes = this.agregados;
    modalRef.componentInstance.idCaja = this.cajas[0].cajas[0].id;
    modalRef.componentInstance.passEntry.subscribe((response) => {

      if (response.status == 'success') {
        this.openExitoso()
        this.obtenerListaDistribucion();

        modalRef.close();
      }
    });
   
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
