import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespachosAlevinosPage } from './despachos-alevinos.page';

const routes: Routes = [
  {
    path: '',
    component: DespachosAlevinosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespachosAlevinosPageRoutingModule {}
