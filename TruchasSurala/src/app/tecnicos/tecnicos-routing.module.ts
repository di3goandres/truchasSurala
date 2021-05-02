import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarinformeComponent } from './registrarinforme/registrarinforme.component';
import { UsuarioGuard } from '../guards/usuario.guard';
import { ListadeinformesComponent } from './listadeinformes/listadeinformes.component';
import { ListaRegistrosComponent } from './00-Registros/lista-registros/lista-registros.component';

const routes: Routes = [
  {
    path: 'registrar', component: RegistrarinformeComponent, 
    canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },

  {
    path: 'ListaInformes', component: ListadeinformesComponent, 
    canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  },
  {
    path: 'VerInformes', component: ListaRegistrosComponent, 
    canLoad: [UsuarioGuard], canActivate: [UsuarioGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicosRoutingModule { }
