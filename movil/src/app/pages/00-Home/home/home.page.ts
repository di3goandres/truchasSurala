import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DatamenuService } from '../../../services/datamenu.service';
import { UserService } from '../../../services/user.service';
import { Finca } from '../../../models/fincas.user';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoProvider } from '../../../services/photo-provider.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {

 url: any;
  fincas: Finca[]=[]
  activar: boolean;



  constructor( private dataService: DatamenuService,
                private userService: UserService,
               private menuCtrl: MenuController,
               public _DomSanitizationService: DomSanitizer,
               public navCtrl: NavController, public photoService: PhotoProvider
               ) { }
  



  ngOnInit() {
    this.dataService.enableAuthenticatedMenu();
    this.activar = false;

    this.traerFincas()

 this.url =this._DomSanitizationService
 .bypassSecurityTrustUrl('data:image/jpeg;base64,file:///storage/emulated/0/Android/data/io.ionic.starter/cache/1597459591105.jpg')

   console.log( this._DomSanitizationService
      .bypassSecurityTrustUrl('data:image/jpeg;base64,file:///storage/emulated/0/Android/data/io.ionic.starter/cache/1597459591105.jpg'))
  }

  traerFincas(){
    this.userService.getFincasUsuario().subscribe(
      response=> {
        console.log(response)
        this.fincas.push(...response.fincas);
      },
      error=> {
        console.log(error)

      }
    )
  }
  toggleMenu() {
    console.log(this.menuCtrl.getMenus())
    this.menuCtrl.toggle();
  }

  cambiarMenu(){

    this.menuCtrl.enable(this.activar, 'authenticated');
    this.menuCtrl.enable(!this.activar, 'unauthenticated');
    console.log('quedo activ', this.menuCtrl.isEnabled('unauthenticated'))
    this.activar = !this.activar;


  }
}
