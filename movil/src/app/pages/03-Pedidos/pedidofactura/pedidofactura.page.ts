import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidofactura',
  templateUrl: './pedidofactura.page.html',
  styleUrls: ['./pedidofactura.page.scss'],
})
export class PedidofacturaPage implements OnInit {

  nombre = "";
  idPedido = "";
  pdfSrc ="";

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.nombre = params.nombrefactura;
        this.idPedido = params.idPedido;
      
        if(params.certificado!= null){
          this.pdfSrc = "/api/despacho/certificado/"
        }else{
          this.pdfSrc = "/api/pedido/factura/"

        }
      }
    );
  }
}
