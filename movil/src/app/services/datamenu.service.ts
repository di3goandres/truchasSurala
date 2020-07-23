import { Injectable } from '@angular/core';
import { Componente } from '../models/menu';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DatamenuService {
  activar: boolean;
  constructor(private http: HttpClient,
              private menuCtrl: MenuController,
              private userService: UserService
               ) { }

  getMenuOpts(logeado) {
    if(logeado){
      return this.http.get<Componente[]>('/assets/data/menu.json');

    }else{
      return this.http.get<Componente[]>('/assets/data/menuInvitado.json');

    }
  }

  enableAuthenticatedMenu() {
    this.activar = false;
    console.log('dato:', this.userService.getToken() );
    if(this.userService.getToken() != null){
      console.log('activo')
     this.activar = true;
    }else{
      console.log('Noactivo')

      this.activar = false;
    }
    this.menuCtrl.enable(this.activar, 'authenticated');
    this.menuCtrl.enable(!this.activar, 'unauthenticated');
  }
}
