import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mensajemodal',
  templateUrl: './mensajemodal.page.html',
  styleUrls: ['./mensajemodal.page.scss'],
})
export class MensajemodalPage implements OnInit {

  @Input() Titulo: string;
  @Input() Mensaje: string;
  @Input() Fecha: string;
  FechaString =""


  constructor(
    public viewCtrl: ModalController,
    public datepipe: DatePipe

  ) { }

  ngOnInit() {
    // this.FechaString =this.datepipe.transform(this.Fecha,  'yyyy-MMM-dd HH:mm');
  }

  dismiss() {
    this.viewCtrl.dismiss();
    }

}
