import { Component, OnInit } from '@angular/core';
import { Despacho } from 'src/app/models/despacho/despacho.response';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-verdespachos',
  templateUrl: './verdespachos.component.html',
  styleUrls: ['./verdespachos.component.scss'],
})
export class VerdespachosComponent implements OnInit {

  noMostrar = true;
  total = 0;
  despachos: Despacho[] = []
  constructor(
    private servicio: PedidosService,
    private storage: Storage,

  ) { }

  ngOnInit() {
    this.recargar();
    if (this.despachos.length == 0) {
      this.traerDespachos()

    }
  }


  async conteo() {
    let total = await this.storage.get('despachos') || []
    this.total = total.length;

  }

  async recargar() {
    // this.fincas  = this.storage.get('fincas' )
    this.despachos = await this.storage.get('despachos') || []


  }
  guardarDespachos() {
    this.storage.set('despachos', this.despachos)
  }

  traerDespachos() {

    this.servicio.obtenerMisDespachos().subscribe(
      OK => {
        this.conteo();
      
       
        if (this.total != OK.despachos.length) {
          this.despachos = []
          this.despachos.push(...OK.despachos)
          this.guardarDespachos();
        }


        this.noMostrar = false;
      },
      ERROR => {

        this.noMostrar = false;
        this.recargar()
        console.log(ERROR)},
    )
  }

  doRefresh(event) {

    this.traerDespachos()
    this.noMostrar = true;


    setTimeout(() => {

      event.target.complete();


    }, 500);
  }

}
