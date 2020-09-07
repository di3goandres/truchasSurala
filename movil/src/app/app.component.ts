import { Component, OnInit, DoCheck } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
// import { PushService } from './services/push.service';
import { Observable } from 'rxjs';
import { Componente } from './models/menu';
import { DatamenuService } from './services/datamenu.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  componentes: Observable<Componente[]>;
  componentesInvitado: Observable<Componente[]>;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    //private pushService: PushService,
    public userService: UserService,

    private dataService: DatamenuService,



  ) {
    this.initializeApp();
    this.loadUser();

  }
  ngDoCheck(): void {
    this.loadUser();

  }
  ngOnInit(): void {

  }

  loadUser(): void {
    this.userService.getIdentity();
    this.userService.getToken();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.pushService.configuracionInicial();
      this.componentes = this.dataService.getMenuOpts(true);
      this.componentesInvitado = this.dataService.getMenuOpts(false);
      this.dataService.enableAuthenticatedMenu();
    });
  }

}
