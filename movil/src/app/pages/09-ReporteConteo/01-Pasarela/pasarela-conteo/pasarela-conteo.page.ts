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
    item.close();
    this.router.navigate(['/lista-pedidos-disponibles']);
    // if (reclamos)
    //   this.VerPoliticas();
  }
}
