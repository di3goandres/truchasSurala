import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatamenuService } from '../../../services/datamenu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  activar: boolean;
  constructor( private dataService: DatamenuService,
               private menuCtrl: MenuController
               ) { }
  
  ngOnInit() {
    this.dataService.enableAuthenticatedMenu();
    this.activar = false;
    
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
