import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos/pedidos.service';
import { Pedido } from '../../../models/pedidos/pedidos.response';

@Component({
  selector: 'app-listmortalidadpedidos',
  templateUrl: './mortalidadpedidos.component.html',
  styleUrls: ['./mortalidadpedidos.component.scss'],
})
export class MortalidadpedidosComponent implements OnInit {

  pedidos: Pedido[] = []
  constructor(
    private servicio: PedidosService,

  ) { }

  ngOnInit() {
    this.cargar()
  }

async  cargar() {
    
  await  this.servicio.obtenerPedidosMortalidad(0).subscribe(
          OK => {
            this.pedidos = [];
            this.pedidos.push(... OK.pedidos)
          },
          ERROR => {console.log(ERROR)},
        )
  }

  doRefresh(event){
    this.cargar()
  }
}
