import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasarelaMortalidadPage } from './pasarela-mortalidad.page';

const routes: Routes = [
  {
    path: '',
    component: PasarelaMortalidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasarelaMortalidadPageRoutingModule {}
