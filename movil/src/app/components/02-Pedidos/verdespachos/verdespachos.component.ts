import { Component, OnInit } from '@angular/core';
import { Despacho } from 'src/app/models/despacho/despacho.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-verdespachos',
  templateUrl: './verdespachos.component.html',
  styleUrls: ['./verdespachos.component.scss'],
})
export class VerdespachosComponent implements OnInit {

  noMostrar = true;
  despachos: Despacho[]= []
  constructor(
    private servicio : PedidosService,
   ) { }

  ngOnInit() {
   this.traerDespachos()
  }


 
 
  traerDespachos(){

    this.servicio.obtenerMisDespachos().subscribe(
      OK => {

        this.despachos = []
        this.despachos.push(...OK.despachos)
        console.log('despachos', OK.despachos)

        this.noMostrar = false;
      },
      ERROR => console.log(ERROR),
    )
  }

  doRefresh(event) {

    this.traerDespachos()
    this.noMostrar = true;
   

    setTimeout(() => {
     
      event.target.complete();
   

    }, 2000);
  }

}
