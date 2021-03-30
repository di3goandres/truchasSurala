import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespachadosPage } from './despachados.page';

const routes: Routes = [
  {
    path: '',
    component: DespachadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespachadosPageRoutingModule {}
