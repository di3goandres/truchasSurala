import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportePorTrazabilidadPage } from './reporte-por-trazabilidad.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePorTrazabilidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePorTrazabilidadPageRoutingModule {}
