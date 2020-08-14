import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatamenuService } from '../../../services/datamenu.service';
import { UserService } from '../../../services/user.service';
import { Finca } from '../../../models/fincas.user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  fincas: Finca[]=[]
  activar: boolean;
  constructor( private dataService: DatamenuService,
                private userService: UserService,
               private menuCtrl: MenuController
               ) { }
  
  ngOnInit() {
    this.dataService.enableAuthenticatedMenu();
    this.activar = false;

    this.traerFincas()

    
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
