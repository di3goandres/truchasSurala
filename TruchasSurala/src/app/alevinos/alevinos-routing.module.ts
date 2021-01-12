import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MontajePedidoComponent } from './01-Montaje/montaje-pedido/montaje-pedido.component';
import { UsuarioGuard } from '../guards/usuario.guard';

const routes: Routes = [
  { // rutas de usuarios
    path: 'MontajePedidos', component: MontajePedidoComponent,
    canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlevinosRoutingModule { }
