import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MortalidaddiariaPage } from './mortalidaddiaria.page';

const routes: Routes = [
  {
    path: '',
    component: MortalidaddiariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortalidaddiariaPageRoutingModule {}
