import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarinformeComponent } from './registrarinforme/registrarinforme.component';
import { UsuarioGuard } from '../guards/usuario.guard';
import { ListadeinformesComponent } from './listadeinformes/listadeinformes.component';

const routes: Routes = [
  {
    path: 'registrar', component: RegistrarinformeComponent, 
    canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },

  {
    path: 'ListaInformes', component: ListadeinformesComponent, 
    canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicosRoutingModule { }
