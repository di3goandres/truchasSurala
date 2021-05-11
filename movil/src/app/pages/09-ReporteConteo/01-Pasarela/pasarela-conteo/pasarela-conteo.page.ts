import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasarela-conteo',
  templateUrl: './pasarela-conteo.page.html',
  styleUrls: ['./pasarela-conteo.page.scss'],
})
export class PasarelaConteoPage implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }


  closeItem(item, reclamos: boolean) {
    let ruta = ""
    item.close();
    if (reclamos) {
      ruta = '/lista-pedidos-disponibles';

    } else {
      ruta = '/conteo-reportada-list';


    }
    this.router.navigate([ruta]);
  }
}
