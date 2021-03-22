import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasarelaPage } from './pasarela.page';

const routes: Routes = [
  {
    path: '',
    component: PasarelaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasarelaPageRoutingModule {}
