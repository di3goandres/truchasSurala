import { Component, OnInit } from '@angular/core';
import { PedidoAlevinos } from 'src/app/models/alevinos/alevinos.pedidos.response';
import { AlevinosService } from '../../../services/01-Alevinos/alevinos.service';

@Component({
  selector: 'app-pedidos-alevinos',
  templateUrl: './pedidos-alevinos.component.html',
  styleUrls: ['./pedidos-alevinos.component.scss'],
})
export class PedidosAlevinosComponent implements OnInit {

  noMostrar = true;
  pedidos: PedidoAlevinos[];
  constructor(
    private service: AlevinosService
  ) { }

  ngOnInit() {

    this.traerPedidos();
  }

  traerPedidos() {
    this.service.traerPedidosUsuario().subscribe(
      OK => {
        this.pedidos = [];
        this.pedidos.push(...OK.pedidos);
        this.noMostrar = false;

        this.service.presentToast("Tienes " + this.pedidos.length + ", pedidos sin despachar o programados")
        if (this.pedidos.length == 0)
          this.service.ModalSinDatos("Programados", "En este momento no cuentas con despachos programados disponibles", "seleccionarTipo")

        console.log(OK)
      },
      ERROR => { console.log(ERROR) },
    )
  }
  doRefresh(event) {
    this.noMostrar = true;

    this.traerPedidos();
  }
}
