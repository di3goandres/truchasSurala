import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrazabilidadesPage } from './trazabilidades.page';

const routes: Routes = [
  {
    path: '',
    component: TrazabilidadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrazabilidadesPageRoutingModule {}
