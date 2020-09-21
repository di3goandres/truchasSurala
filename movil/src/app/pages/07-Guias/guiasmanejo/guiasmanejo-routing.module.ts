import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiasmanejoPage } from './guiasmanejo.page';

const routes: Routes = [
  {
    path: '',
    component: GuiasmanejoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiasmanejoPageRoutingModule {}
