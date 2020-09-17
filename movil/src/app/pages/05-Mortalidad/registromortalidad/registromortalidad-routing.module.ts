import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistromortalidadPage } from './registromortalidad.page';

const routes: Routes = [
  {
    path: '',
    component: RegistromortalidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistromortalidadPageRoutingModule {}
