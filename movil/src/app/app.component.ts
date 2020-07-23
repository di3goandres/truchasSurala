import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { PushService } from './services/push.service';
import { Observable } from 'rxjs';
import { Componente } from './models/menu';
import { DatamenuService } from './services/datamenu.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  componentes: Observable<Componente[]>;
  componentesInvitado: Observable<Componente[]>;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService: PushService,
    private dataService: DatamenuService,
    


  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushService.configuracionInicial();
      this.componentes = this.dataService.getMenuOpts(true);
      this.componentesInvitado = this.dataService.getMenuOpts(false);
      this.dataService.enableAuthenticatedMenu();
    });
  }
 
}
