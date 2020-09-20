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
    path: 'home',
    loadChildren: () => import('./pages/00-Home/home/home.module').then( m => m.HomePageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]

  },
  {
    path: 'homelogin',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'logout/:sure', 
    loadChildren: () => import('./pages/01-Login/login/login.module').then( m => m.LoginPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  },
  {
    path: 'pedidofactura/:idPedido/:nombrefactura',
    loadChildren: () => import('./pages/03-Pedidos/pedidofactura/pedidofactura.module').then( m => m.PedidofacturaPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  },
  {
    path: 'pedidos/:id',
    loadChildren: () => import('./pages/03-Pedidos/pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]

  },
  {
    path: 'despachos',
    loadChildren: () => import('./pages/03-Pedidos/despachos/despachos.module').then( m => m.DespachosPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  },
  {
    path: 'trazabilidad/:id',
    loadChildren: () => import('./pages/04-Trazabilidd/trazabilidades/trazabilidades.module').then( m => m.TrazabilidadesPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  },
  {
    path: 'RegistroMortalidad/:id',
    loadChildren: () => import('./pages/05-Mortalidad/registromortalidad/registromortalidad.module').then( m => m.RegistromortalidadPageModule),
    canLoad: [UsuarioGuard],
    canActivate:  [UsuarioGuard]
  },
  {
    path: 'medicamentos',
    loadChildren: () => import('./pages/06-Productos/medicamentos/medicamentos.module').then( m => m.MedicamentosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
