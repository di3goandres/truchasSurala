import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Guias } from '../../../models/guias/guias';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.scss'],
})
export class GuiaComponent implements OnInit {

  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  @Input() guia : Guias; 
  constructor(
    public viewCtrl: ModalController,
  

  ) { }

  ionViewDidEnter(){
    this.slides.update();
  }
  slideOpts = {
    initialSlide: 0,
    speed: 400,

  };
  ngOnInit() {
    // this.FechaString =this.datepipe.transform(this.Fecha,  'yyyy-MMM-dd HH:mm');
  }

  dismiss() {
    this.viewCtrl.dismiss(null, 'cancel');
    }

}
