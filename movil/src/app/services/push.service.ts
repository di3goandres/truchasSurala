import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: any[] = [
    {
      title: 'titulo de la notificacion',
      body: 'Cuerpo de la notificacion',
      date: new Date(),
      additionalData: '',
      notificacionID: 0
    }
  ];
  constructor(private oneSignal: OneSignal) { }

  configuracionInicial() {
    this.oneSignal.startInit('81f51b4c-e487-4373-8dc5-d012822fb46e', '215977003635');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificacion abierta', noti)
      this.notificacionRecibida(noti);

    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta', noti)
    });

    this.oneSignal.endInit();
  }

  notificacionRecibida(noti: OSNotification) {
    const payload = noti.payload;
    const existePush = this.mensajes.find(mensaje => mensaje.notificacionID === payload.notificationID);

    if (existePush) {
      return;
    }

    this.mensajes.unshift(payload);
  }
}
