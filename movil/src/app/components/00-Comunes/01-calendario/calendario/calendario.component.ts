import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {
  date: string;
  type: 'string';
  constructor(
    public viewCtrl: ModalController,

  ) { }

  ngOnInit() { }
  onChange(event) {
    console.log(event);
    this.viewCtrl.dismiss(null, this.date);
  }
  dismiss() {
    this.viewCtrl.dismiss(null, 'cancel');
  }
}
