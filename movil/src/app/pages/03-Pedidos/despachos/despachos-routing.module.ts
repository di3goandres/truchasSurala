import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespachosPage } from './despachos.page';

const routes: Routes = [
  {
    path: '',
    component: DespachosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespachosPageRoutingModule {}
