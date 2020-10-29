import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferirnosPage } from './preferirnos.page';

const routes: Routes = [
  {
    path: '',
    component: PreferirnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferirnosPageRoutingModule {}
