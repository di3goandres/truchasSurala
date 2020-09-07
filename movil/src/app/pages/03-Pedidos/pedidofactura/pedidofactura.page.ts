import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidofactura',
  templateUrl: './pedidofactura.page.html',
  styleUrls: ['./pedidofactura.page.scss'],
})
export class PedidofacturaPage implements OnInit {

  nombre = "";
  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        console.log(params)
        this.nombre = params.nombrefactura;
       

      }
    );
  }
}
