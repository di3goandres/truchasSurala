import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GuiasService } from '../../../services/guias/guias.service';
import { Politicas } from '../../../models/guias/guias';

@Component({
  selector: 'app-politicasmortalidad',
  templateUrl: './politicasmortalidad.component.html',
  styleUrls: ['./politicasmortalidad.component.scss'],
})
export class PoliticasmortalidadComponent implements OnInit {
  @Input() politicas: Politicas
  descripciones: any[] = []
  constructor(
    
    public viewCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.carcarPoliticas()
  }

  dismiss() {
    this.viewCtrl.dismiss(null, 'cancel');
  }

  carcarPoliticas() {

    this.descripciones.push(...this.politicas.descripciones)


  }

}
