import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MortalidadReportadaPage } from './mortalidad-reportada.page';

const routes: Routes = [
  {
    path: '',
    component: MortalidadReportadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortalidadReportadaPageRoutingModule {}
