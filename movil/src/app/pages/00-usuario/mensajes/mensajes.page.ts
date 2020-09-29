import { Component, OnInit, ApplicationRef } from '@angular/core';
import { PushService } from '../../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  mensajes: OSNotificationPayload[] = [];
  constructor(
    private pushService: PushService,
     private applicationRef: ApplicationRef
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

  async ionViewWillEnter() {
    this.mensajes = await this.pushService.getMensajes()

  }

}
