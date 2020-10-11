import { Component, OnInit, ApplicationRef, ViewChild } from '@angular/core';
import { PushService } from '../../../services/push.service';

import { MensajesPush } from '../../../models/mensajes/mensajes.response';
import { IonList, ModalController } from '@ionic/angular';
import { MensajemodalPage } from '../mensajemodal/mensajemodal.page';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  @ViewChild('lista') lista : IonList;
  mensajes: MensajesPush[] = [];
  constructor(
    private pushService: PushService,
     private applicationRef: ApplicationRef,
     public modalController: ModalController
  ) { }

  ngOnInit() {
    this.pushService.pushListener.subscribe(
      Notificacion => {
        console.log(Notificacion);
        this.mensajes.unshift(Notificacion);
        
        this.applicationRef.tick()
      },

    )
  }
  async presentModal(mensaje:  MensajesPush) {
    let enviar = this.mensajes.find(item=> {
      return item.notificationID == mensaje.notificationID
    })
  
    const modal = await this.modalController.create({
      component: MensajemodalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'Titulo': enviar.title,
        'Mensaje': enviar.body,
        'Fecha': enviar.FechaCorta,

     
      }
    });
    return await modal.present();
  }

  async borrar(mensaje:  MensajesPush){

    console.log(mensaje);
    this.mensajes = await this.pushService.BorrarMensaje(mensaje)

  }
  async ionViewWillEnter() {
    this.mensajes = await this.pushService.getMensajes()

  }

}
