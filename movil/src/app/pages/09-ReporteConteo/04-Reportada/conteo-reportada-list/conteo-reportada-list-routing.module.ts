import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConteoReportadaListPage } from './conteo-reportada-list.page';

const routes: Routes = [
  {
    path: '',
    component: ConteoReportadaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConteoReportadaListPageRoutingModule {}
