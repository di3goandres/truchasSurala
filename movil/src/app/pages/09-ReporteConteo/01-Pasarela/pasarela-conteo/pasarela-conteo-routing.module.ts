import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasarelaConteoPage } from './pasarela-conteo.page';

const routes: Routes = [
  {
    path: '',
    component: PasarelaConteoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasarelaConteoPageRoutingModule {}
