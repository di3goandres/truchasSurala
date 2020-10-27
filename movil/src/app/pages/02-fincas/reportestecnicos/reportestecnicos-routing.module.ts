import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportestecnicosPage } from './reportestecnicos.page';

const routes: Routes = [
  {
    path: '',
    component: ReportestecnicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportestecnicosPageRoutingModule {}
