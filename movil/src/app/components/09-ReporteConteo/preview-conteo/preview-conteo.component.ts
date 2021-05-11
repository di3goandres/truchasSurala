import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-conteo',
  templateUrl: './preview-conteo.component.html',
  styleUrls: ['./preview-conteo.component.scss'],
})
export class PreviewConteoComponent implements OnInit {

 @Input() porcentaje: number

  constructor(
    public viewCtrl: ModalController,

  ) { }

  ngOnInit() {}

  dismiss(){
    this.viewCtrl.dismiss(null, 'OK');

  }

}
