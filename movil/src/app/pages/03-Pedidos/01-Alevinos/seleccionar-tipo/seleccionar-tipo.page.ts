import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccionar-tipo',
  templateUrl: './seleccionar-tipo.page.html',
  styleUrls: ['./seleccionar-tipo.page.scss'],
})
export class SeleccionarTipoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  closeItem(item) {
    item.close();
  }
}
