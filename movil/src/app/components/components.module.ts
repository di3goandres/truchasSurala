import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InvitadosComponent } from './menu/invitados/invitados.component';
import { MenuusuarioComponent } from './menu/menuusuario/menuusuario.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    InvitadosComponent,
    MenuusuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    InvitadosComponent,
    MenuusuarioComponent
  ]
})
export class ComponentsModule { }
