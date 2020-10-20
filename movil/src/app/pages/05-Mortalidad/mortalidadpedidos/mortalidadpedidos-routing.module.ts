import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MortalidadpedidosPage } from './mortalidadpedidos.page';

const routes: Routes = [
  {
    path: '',
    component: MortalidadpedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortalidadpedidosPageRoutingModule {}
