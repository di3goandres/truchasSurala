import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { DespachadoAlevinos } from 'src/app/models/alevinos/alevinos.despachados.response';

@Component({
  selector: 'app-informe-alevino',
  templateUrl: './informe-alevino.component.html',
  styleUrls: ['./informe-alevino.component.scss'],
})
export class InformeAlevinoComponent implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @Input() despacho: DespachadoAlevinos;
  constructor(
    public viewCtrl: ModalController,


  ) { }

  // ionViewDidEnter() {
  //   this.slides.update();
  // }
  slideOpts = {
    initialSlide: 0,
    speed: 400,

  };
  ngOnInit() {

  }

  dismiss() {
    this.viewCtrl.dismiss(null, 'cancel');
  }



}
