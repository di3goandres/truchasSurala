import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './service/user/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarcajaComponent } from './componentes/despacho/agregarcaja/agregarcaja.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;

  title = 'Truchas Surala';
  constructor(
    public userService: UserService,
    public matDialog: MatDialog
  ) {
    this.loadUser();
  }
  ngDoCheck(): void {
    this.loadUser();

  }
  ngOnInit(): void {

  }

  loadUser(): void {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
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
