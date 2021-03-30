import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarTipoPage } from './seleccionar-tipo.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarTipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarTipoPageRoutingModule {}
