import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilusuarioPage } from './perfilusuario.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilusuarioPageRoutingModule {}
