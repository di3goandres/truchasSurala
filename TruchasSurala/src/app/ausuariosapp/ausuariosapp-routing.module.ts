import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoUsuarioComponent } from './00-Agregar/nuevo-usuario/nuevo-usuario.component';
import { UsuarioGuard } from '../guards/usuario.guard';
import { SinpermisoComponent } from './00-Permisos/sinpermiso/sinpermiso.component';
import { AdminGuard } from '../guards/admin.guard';
import { ListaUsuariosAPPComponent } from './01-Lista/lista-usuarios-app/lista-usuarios-app.component';

const routes: Routes = [
  {
    path: 'registrar', component: NuevoUsuarioComponent, 
    canLoad: [AdminGuard], canActivate: [AdminGuard]
  },
  {
    path: 'SinPermisos', component: SinpermisoComponent
    
  },
  {
    path: 'ListaUsuarios', component: ListaUsuariosAPPComponent, 
    canLoad: [AdminGuard], canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AusuariosappRoutingModule { }
