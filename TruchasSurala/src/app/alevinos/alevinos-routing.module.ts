import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MontajePedidoComponent } from './01-Montaje/montaje-pedido/montaje-pedido.component';
import { UsuarioGuard } from '../guards/usuario.guard';
import { AlevinoGuard } from '../guards/alevino/alevino.guard';

const routes: Routes = [
  { // rutas de usuarios
    path: 'MontajePedidos', component: MontajePedidoComponent,
    canLoad: [AlevinoGuard], canActivate: [AlevinoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlevinosRoutingModule { }
