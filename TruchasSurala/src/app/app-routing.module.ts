import { LoginComponent } from './componentes/login/login.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './componentes/register/register.component';
import { DefaultComponent } from './componentes/default/default.component';
import { ErrorComponent } from './componentes/error/error.component';
import { InvitadoComponent } from './componentes/invitado/invitado.component';
import { DespachoComponent } from './componentes/despacho/despacho.component';
import { DespachosComponent } from './componentes/despachos/despachos.component';
import { BandejascajaComponent } from './componentes/bandejascaja/bandejascaja.component';



const routes: Routes = [
  {
    path: 'surala/login', component: LoginComponent
  },
  {
    path: 'surala/register', component: RegisterComponent
  },
  {
    path: 'surala/home', component: DefaultComponent
  },
  {
    path: 'surala/error', component: ErrorComponent
  },
  {
    path: 'surala/visitante', component: InvitadoComponent
  },
  {
    path: 'surala/logout/:sure', component: LoginComponent,
  },
  { // rutas de despacho
    path: 'surala/despacho/create', component: DespachosComponent,
  },
  {
    path: 'surala/despacho/:id', component: DespachoComponent,
  },
  {
    path: 'surala/cajas/bandejas/:id', component: BandejascajaComponent,
  },

 //
  {
    path: '**',
    redirectTo: 'surala/error',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
