import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
 idDespacho : any;
  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.idDespacho = params.id;
       
      }
    );
  }

}
