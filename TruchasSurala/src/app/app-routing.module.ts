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
import { CrearComponent } from './componentes/despacho/crear/crear.component';
import { AgregarcajaComponent } from './componentes/despacho/agregarcaja/agregarcaja.component';
import { PedidosComponent } from './componentes/despacho/pedidos/pedidos.component';

import { TrazabilidadComponent } from './componentes/trazabilidades/trazabilidad/trazabilidad.component';
import { TrazabilidadesComponent } from './componentes/trazabilidades/trazabilidades.component';
import { UsuarioGuard } from './guards/usuario.guard';
import { ListausuarioComponent } from './componentes/02-Usuario/01-lista/listausuario/listausuario.component';
import { CreardespachoComponent } from './componentes/05-Despacho/creardespacho/creardespacho.component';
import { VerlistardespachosComponent } from './componentes/05-Despacho/verlistardespachos/verlistardespachos.component';
import { ListapedidosComponent } from './componentes/06-Pedidos/listapedidos/listapedidos.component';
import { ListapedidosfacturaComponent } from './componentes/06-Pedidos/listapedidosfactura/listapedidosfactura.component';
import { ListadespachosfacturaComponent } from './componentes/06-Pedidos/listadespachosfactura/listadespachosfactura.component';
import { VerdistribucionComponent } from './componentes/07-Distribucion/verdistribucion/verdistribucion.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/interceptor/auth.interceptor';
import { UserService } from './service/user/user.service';
import { RegistrollegadaComponent } from './componentes/05-Despacho/registrollegada/registrollegada.component';
import { EnvionotificacionesComponent } from './componentes/09-Notificaciones/envionotificaciones/envionotificaciones.component';
import { RegistromortalidadComponent } from './componentes/10-Mortalidad/registromortalidad/registromortalidad.component';
import { EnvioGeneralComponent } from './componentes/09-Notificaciones/01-General/envio-general/envio-general.component';
import { DescargarMortalidadesComponent } from './componentes/10-Mortalidad/descargar-mortalidades/descargar-mortalidades.component';



const routes: Routes = [
  {
    path: 'surala/login', component: LoginComponent
  },
  {
    path: 'surala/register', component: RegisterComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  {
    path: 'surala/home', component: DefaultComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  {
    path: 'surala/error', component: ErrorComponent
  },
  {
    path: 'surala/visitante', component: InvitadoComponent
  },
  {
    path: 'surala/logout/:sure', component: LoginComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de despacho
    path: 'surala/despacho/view', component: VerlistardespachosComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de despacho
    path: 'surala/despacho/facturas/view', component: ListadespachosfacturaComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de despacho
    path: 'surala/despacho/create', component: CreardespachoComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  {
    path: 'surala/despacho/:id', component: DespachoComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  {
    path: 'surala/cajas/bandejas/:id', component: BandejascajaComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },

  { // rutas de despacho
    path: 'surala/despacho/caja/create/:id', component: AgregarcajaComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de usuarios
    path: 'surala/despachos/registrarllegada', component: RegistrollegadaComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },

  { // rutas de despacho
    path: 'surala/pedidos/:id', component: ListapedidosComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de despacho/pedidos
    path: 'surala/pedidos/factura/:id', component: ListapedidosfacturaComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de despacho
    path: 'surala/distribucion/:id', component: VerdistribucionComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de despacho
    path: 'surala/distribucion/Generar/:id', component: VerdistribucionComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de despacho
    path: 'surala/distribucion/ver/:id', component: TrazabilidadesComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de usuarios
    path: 'surala/usuarios', component: ListausuarioComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },


  { // rutas de usuarios
    path: 'surala/despachos/notificaciones', component: EnvionotificacionesComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // notificaciones de usuarios general
    path: 'surala/usuarios/notificaciones', component: EnvioGeneralComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  /** informes tecnicos */

  { // rutas de Tecnicos
    path: 'surala/informestecnicos',
    loadChildren: './tecnicos/tecnicos.module#TecnicosModule',

  },
  { // rutas de Alevinos
    path: 'surala/alevinos',
    loadChildren: './alevinos/alevinos.module#AlevinosModule',

  },
  { // rutas de Alevinos
    path: 'surala/usuariosSurala',
    loadChildren: './ausuariosapp/ausuariosapp.module#AusuariosappModule',

  },
  { // rutas de usuarios
    path: 'surala/mortalidad', component: RegistromortalidadComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  { // rutas de usuarios
    path: 'surala/mortalidad/informe', component: DescargarMortalidadesComponent, canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  //
  {
    path: '**',
    redirectTo: 'surala/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }),



  ],
  exports: [RouterModule]


})
export class AppRoutingModule { }
