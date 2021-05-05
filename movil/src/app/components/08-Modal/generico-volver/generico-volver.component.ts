import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generico-volver',
  templateUrl: './generico-volver.component.html',
  styleUrls: ['./generico-volver.component.scss'],
})
export class GenericoVolverComponent implements OnInit {

  @Input() Titulo: string;
  @Input() Descripcion: string;
  @Input() Ruta: string;



  constructor(
    public viewCtrl: ModalController,

  ) { }

  ngOnInit() {}

  dismiss(){
    this.viewCtrl.dismiss(null, 'OK');

  }
}
