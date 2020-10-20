import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipomortalidadPage } from './tipomortalidad.page';

const routes: Routes = [
  {
    path: '',
    component: TipomortalidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipomortalidadPageRoutingModule {}
