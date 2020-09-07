import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [ 
  {
    path: 'login',
    loadChildren: () => import('./pages/01-Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'fincas',
    loadChildren: () => import('./pages/02-fincas/fincas/fincas.module').then( m => m.FincasPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/03-Pedidos/pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]

  },
  {
    path: 'home',
    loadChildren: () => import('./pages/00-Home/home/home.module').then( m => m.HomePageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]

  },
  {
    path: 'logout/:sure', 
    loadChildren: () => import('./pages/01-Login/login/login.module').then( m => m.LoginPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  },
  {
    path: 'pedidofactura/:nombrefactura',
    loadChildren: () => import('./pages/03-Pedidos/pedidofactura/pedidofactura.module').then( m => m.PedidofacturaPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
