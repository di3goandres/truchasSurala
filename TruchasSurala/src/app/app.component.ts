import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './service/user/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarcajaComponent } from './componentes/despacho/agregarcaja/agregarcaja.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public role;
  permitirEnviarMensajes = false;

  title = 'Truchas Surala';
  constructor(
    public userService: UserService,
    public matDialog: MatDialog,
    private _location: Location

  ) {
    this.loadUser();
  }
  ngDoCheck(): void {
    this.loadUser();

  }
  ngOnInit(): void {
  let resul= new Date().getDay();

    if(this.role == "ALEVINOS"){
      if(resul==6){
         this.userService.openSnackBar("Es día de generar la programación de alevinos", "Gracias")
      }else{
       this.userService.openSnackBar("recuerda el día sabado, Generar la programación de alevinos", "de Acuerdo")
 
      }
    }
  }

  loadUser(): void {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.role = this.userService.getRole();
    this.validarEnvioMensajes();
  }

 validarEnvioMensajes(){
   if(this.role =="ADMIN" || this.role =="OVAS"){
   
      this.permitirEnviarMensajes =true;
   }

  
 }
 
 backClicked() {
  this._location.back();
}

  openModal(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.position = {
      top: '0',
      left: '0'
    };
    dialogConfig.hasBackdrop = true;
    
    // dialogConfig.height = '100%';
    // dialogConfig.width = '100%';


    // dialogConfig.position.left = '50px';


    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AgregarcajaComponent, dialogConfig);
  }
}
