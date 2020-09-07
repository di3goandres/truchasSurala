import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidofacturaPage } from './pedidofactura.page';

const routes: Routes = [
  {
    path: '',
    component: PedidofacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidofacturaPageRoutingModule {}
