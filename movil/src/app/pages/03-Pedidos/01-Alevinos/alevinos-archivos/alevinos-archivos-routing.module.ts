import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlevinosArchivosPage } from './alevinos-archivos.page';

const routes: Routes = [
  {
    path: '',
    component: AlevinosArchivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlevinosArchivosPageRoutingModule {}
