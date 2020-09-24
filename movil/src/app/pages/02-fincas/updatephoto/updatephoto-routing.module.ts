import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatephotoPage } from './updatephoto.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatephotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatephotoPageRoutingModule {}
