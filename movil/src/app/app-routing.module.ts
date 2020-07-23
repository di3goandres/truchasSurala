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
    canLoad: [UsuarioGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/03-Pedidos/pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canLoad: [UsuarioGuard]

  },
  {
    path: 'home',
    loadChildren: () => import('./pages/00-Home/home/home.module').then( m => m.HomePageModule),
    canLoad: [UsuarioGuard]

  },
  {
    path: 'logout/:sure', 
    loadChildren: () => import('./pages/01-Login/login/login.module').then( m => m.LoginPageModule)

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
