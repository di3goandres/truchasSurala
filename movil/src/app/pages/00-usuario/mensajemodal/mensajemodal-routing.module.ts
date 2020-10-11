import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajemodalPage } from './mensajemodal.page';

const routes: Routes = [
  {
    path: '',
    component: MensajemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajemodalPageRoutingModule {}
