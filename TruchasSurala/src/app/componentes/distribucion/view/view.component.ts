import { PedidoUnico } from './../../../models/pedido';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Distribucion } from '../../../models/distribucion';
import { BandejaDistribucion, Grupocaja } from '../../../models/datosDistribucion';
import { Cajas } from '../../../models/cajas';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreardistribucionComponent } from '../creardistribucion/creardistribucion.component';
import { ChangeDetectorRef } from '@angular/core';
import { DistribucionResponse } from '../../../models/distribucion.response';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: string;
  distribuciones: DistribucionResponse[] = [];

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

    // this.obtenerListaDistribucion();
    this.obtenerPedido();
  }

  // tslint:disable-next-line: typedef
 

  // tslint:disable-next-line: typedef
  private obtenerPedido() {
    this.userService.getPedidoActual(this.id).subscribe(
      response => {

        if (response.status !== 'error') {


          this.pedido = response.pedido;
          this.obtenerDatos();

        }
      },
      error => { });
  }
  // tslint:disable-next-line: typedef
  private obtenerListaDistribucion() {
    this.userService.getDistribucion(this.id).subscribe(
      response => {

        if (response.status !== 'error') {
         
          console.log('Distribucionesesss', response);
          
          this.mostrar = true;


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

          console.log(this.cajas)




        }
      },
      error => { });
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
        this.obtenerListaDistribucion();
        this.obtenerPedido();
        modalRef.close();
      }
    });
    modalRef.result.then((result) => {

      console.log('result', result);
    }, (reason) => {



      this.obtenerListaDistribucion();
      this.obtenerPedido();



      console.log('reason', reason);
      if (reason === 'OK') {
        console.log('entrre perras!!');
        // this.consultaInicial(this.id);
        console.log(this.router.url);

        // this.router.navigate([this.url]);




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
