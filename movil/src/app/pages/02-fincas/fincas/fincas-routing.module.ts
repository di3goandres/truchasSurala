import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FincasPage } from './fincas.page';

const routes: Routes = [
  {
    path: '',
    component: FincasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FincasPageRoutingModule {}
