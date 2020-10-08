import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarinformeComponent } from './registrarinforme/registrarinforme.component';
import { UsuarioGuard } from '../guards/usuario.guard';

const routes: Routes = [
  {
    path: 'registrar', component: RegistrarinformeComponent, 
    canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicosRoutingModule { }
