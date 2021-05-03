import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Reportado } from 'src/app/models/mortalidad/mortalidad.reportado.response';

@Component({
  selector: 'app-mortalidad-detalle',
  templateUrl: './mortalidad-detalle.component.html',
  styleUrls: ['./mortalidad-detalle.component.scss'],
})
export class MortalidadDetalleComponent implements OnInit {

  @Input() detalle:Reportado
  constructor(
    public viewCtrl: ModalController,

  ) { }

  ngOnInit() {

    
  }
  dismiss() {
    this.viewCtrl.dismiss(null, 'OK');
  }



}
