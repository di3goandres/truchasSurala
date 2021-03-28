import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MontajePedidoComponent } from './01-Montaje/montaje-pedido/montaje-pedido.component';
import { UsuarioGuard } from '../guards/usuario.guard';
import { AlevinoGuard } from '../guards/alevino/alevino.guard';
import { AlevinosprogramcionComponent } from './02-Programacion/alevinosprogramcion/alevinosprogramcion.component';
import { PedidosClientesComponent } from './05-Clientes/pedidos-clientes/pedidos-clientes.component';
import { VerPropiosComponent } from './06-Lote/ver-propios/ver-propios.component';
import { InformePedidoComponent } from './05-Clientes/informe-pedido/informe-pedido.component';

const routes: Routes = [
  { 
    path: 'MontajePedidos', component: MontajePedidoComponent,
    canLoad: [AlevinoGuard], canActivate: [AlevinoGuard]
  },

  {
    path: 'Programacion', component: AlevinosprogramcionComponent,
    canLoad: [AlevinoGuard], canActivate: [AlevinoGuard]
  },
  {
    path: 'PedidosCliente', component: PedidosClientesComponent,
    canLoad: [AlevinoGuard], canActivate: [AlevinoGuard]
  }
  ,
  {
    path: 'LotesPropios', component: VerPropiosComponent,
    canLoad: [AlevinoGuard], canActivate: [AlevinoGuard]
  },
  {
    path: 'Informe/:id', component: InformePedidoComponent,
    canLoad: [AlevinoGuard], canActivate: [AlevinoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlevinosRoutingModule { }
