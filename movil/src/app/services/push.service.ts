import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { UserService } from './user.service';
import { Respuesta } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  userId: string;
  mensajes: OSNotificationPayload[] = [
    // {
    //   title: 'titulo de la notificacion',
    //   body: 'Cuerpo de la notificacion',
    //   date: new Date(),
    //   additionalData: '',
    //   notificacionID: 0
    // }
  ];

  pushListener = new EventEmitter<OSNotificationPayload>();
  constructor(
    private oneSignal: OneSignal,
    private storage: Storage,
    private service: UserService
  ) {

    this.cargarMensajes();
  }

  configuracionInicial() {
    this.oneSignal.startInit('81f51b4c-e487-4373-8dc5-d012822fb46e', '215977003635');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((notificacion) => {
      // do something when notification is received
      console.log('Notificacion recibida', notificacion)
      this.notificacionRecibida(notificacion);

    });

    this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta', noti)
      await this.notificacionRecibida(noti.notification);

    });

    this.oneSignal.getIds().then(info => {
      this.userId = info.userId
    })
    this.oneSignal.endInit();
  }

  async notificacionRecibida(noti: OSNotification) {
    await this.cargarMensajes();

    const payload = noti.payload;
    const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);

    console.log('existe', existePush)
    if (existePush) {
      return;
    } else {
      this.mensajes.unshift(payload);
      this.pushListener.emit(payload);
      await this.guardarMensajes();
    }


  }

  guardarMensajes() {
    this.storage.set('mensajes', this.mensajes)

  }

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.mensajes];
  }
  async cargarMensajes() {
    this.mensajes = await this.storage.get('mensajes') || []


  }

  tagUsuarioLogeado() {
  
    this.sendUniqueid();

  }

  tagNologueado() {
    
    this.removeUniqueId();
  }

  sendUniqueid() {
    this.oneSignal.getIds().then(info => {
      this.userId = info.userId
    })
    let token = new Token()
    token.token =  this.userId ;
    let json = JSON.stringify(token)
    let params = 'json=' + json;
    console.log(params)
    this.service
      .ejecutarQueryPost<Respuesta>('/api/Notificaciones', params).subscribe(
        OK => { 

          this.oneSignal.sendTag("user_type", "fincas");
         },
        ERROR => { console.log(ERROR) },
      )
  }

  //remover para cuando se desloguee
  removeUniqueId(){
    this.oneSignal.getIds().then(info => {
      this.userId = info.userId
    })
    let token = new Token()
    token.token =  this.userId ;
    let json = JSON.stringify(token)
    let params = 'json=' + json;
    console.log(params)
    this.service
      .ejecutarQueryPost<Respuesta>('/api/Notificaciones/borrar', params).subscribe(
        OK => { 
           this.oneSignal.deleteTag("user_type");
        },
        ERROR => { console.log(ERROR) },
      )
  }


}


export class Token{
  token:string;
}
