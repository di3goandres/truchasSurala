import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPedidosDisponiblesPage } from './lista-pedidos-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPedidosDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPedidosDisponiblesPageRoutingModule {}
