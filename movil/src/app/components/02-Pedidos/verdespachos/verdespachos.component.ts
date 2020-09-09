import { Component, OnInit } from '@angular/core';
import { Despacho } from 'src/app/models/despacho/despacho.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-verdespachos',
  templateUrl: './verdespachos.component.html',
  styleUrls: ['./verdespachos.component.scss'],
})
export class VerdespachosComponent implements OnInit {

  
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
      },
      ERROR => console.log(ERROR),
    )
  }

  doRefresh(event) {
    this.traerDespachos()
   

    setTimeout(() => {
     
      event.target.complete();
    }, 2000);
  }

}
