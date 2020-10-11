import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Guias } from '../../../models/guias/guias';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.scss'],
})
export class GuiaComponent implements OnInit {

  @Input() guia : Guias; 
  constructor(
    public viewCtrl: ModalController,
  

  ) { }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  ngOnInit() {
    // this.FechaString =this.datepipe.transform(this.Fecha,  'yyyy-MMM-dd HH:mm');
  }

  dismiss() {
    this.viewCtrl.dismiss();
    }

}
