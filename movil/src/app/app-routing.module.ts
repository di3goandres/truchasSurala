import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/01-Login/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'fincas',
    loadChildren: () => import('./pages/02-fincas/fincas/fincas.module').then(m => m.FincasPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/00-Home/home/home.module').then(m => m.HomePageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]

  },
  {
    path: 'homelogin',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'logout/:sure',
    loadChildren: () => import('./pages/01-Login/login/login.module').then(m => m.LoginPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'pedidofactura/:idPedido/:nombrefactura',
    loadChildren: () => import('./pages/03-Pedidos/pedidofactura/pedidofactura.module').then(m => m.PedidofacturaPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'certificados/:idPedido/:nombrefactura/:certificado',
    loadChildren: () => import('./pages/03-Pedidos/pedidofactura/pedidofactura.module').then(m => m.PedidofacturaPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'pedidos/:id',
    loadChildren: () => import('./pages/03-Pedidos/pedidos/pedidos.module').then(m => m.PedidosPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]

  },
  {
    path: 'despachos',
    loadChildren: () => import('./pages/03-Pedidos/despachos/despachos.module').then(m => m.DespachosPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'trazabilidad/:id',
    loadChildren: () => import('./pages/04-Trazabilidd/trazabilidades/trazabilidades.module').then(m => m.TrazabilidadesPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'RegistroMortalidad/:id',
    loadChildren: () => import('./pages/05-Mortalidad/registromortalidad/registromortalidad.module').then(m => m.RegistromortalidadPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'medicamentos',
    loadChildren: () => import('./pages/06-Productos/medicamentos/medicamentos.module').then(m => m.MedicamentosPageModule)
  },
  {
    path: 'guiasmanejo',
    loadChildren: () => import('./pages/07-Guias/guiasmanejo/guiasmanejo.module').then(m => m.GuiasmanejoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/00-usuario/perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'updatephoto/:id',
    loadChildren: () => import('./pages/02-fincas/updatephoto/updatephoto.module').then( m => m.UpdatephotoPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./pages/00-usuario/mensajes/mensajes.module').then( m => m.MensajesPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'mensajemodal',
    loadChildren: () => import('./pages/00-usuario/mensajemodal/mensajemodal.module').then( m => m.MensajemodalPageModule)
  },
  {
    path: 'tipoReporteMortalidad',
    loadChildren: () => import('./pages/05-Mortalidad/tipomortalidad/tipomortalidad.module').then( m => m.TipomortalidadPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'mortalidadpedidos/:id',
    loadChildren: () => import('./pages/05-Mortalidad/mortalidadpedidos/mortalidadpedidos.module').then( m => m.MortalidadpedidosPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'RegistrarMortalidadDiaria/:id',
    loadChildren: () => import('./pages/05-Mortalidad/mortalidaddiaria/mortalidaddiaria.module').then( m => m.MortalidaddiariaPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./pages/00-usuario/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'ReportesTecnicos',
    loadChildren: () => import('./pages/02-fincas/reportestecnicos/reportestecnicos.module').then( m => m.ReportestecnicosPageModule),
    canLoad: [UsuarioGuard],
    canActivate: [UsuarioGuard]
  },
  {
    path: 'Preferirnos',
    loadChildren: () => import('./pages/08-Razones/preferirnos/preferirnos.module').then( m => m.PreferirnosPageModule)

  },
  {
    path: 'pasarela',
    loadChildren: () => import('./pages/03-Pedidos/pasarela/pasarela.module').then( m => m.PasarelaPageModule)
  },
  {
    path: 'despachosAlevinos',
    loadChildren: () => import('./pages/03-Pedidos/01-Alevinos/despachos-alevinos/despachos-alevinos.module').then( m => m.DespachosAlevinosPageModule)
  },
  {
    path: 'seleccionarTipo',
    loadChildren: () => import('./pages/03-Pedidos/01-Alevinos/seleccionar-tipo/seleccionar-tipo.module').then( m => m.SeleccionarTipoPageModule)
  },
  {
    path: 'despachados',
    loadChildren: () => import('./pages/03-Pedidos/01-Alevinos/despachados/despachados.module').then( m => m.DespachadosPageModule)
  },
  {
    path: 'pasarela-mortalidad',
    loadChildren: () => import('./pages/05-Mortalidad/pasarela-mortalidad/pasarela-mortalidad.module').then( m => m.PasarelaMortalidadPageModule)
  },
  {
    path: 'mortalidad-reportada',
    loadChildren: () => import('./pages/05-Mortalidad/mortalidad-reportada/mortalidad-reportada.module').then( m => m.MortalidadReportadaPageModule)
  },
  {
    path: 'alevinos-archivos/:id/:id_lote/:existe/:nombre',
    loadChildren: () => import('./pages/03-Pedidos/01-Alevinos/alevinos-archivos/alevinos-archivos.module').then( m => m.AlevinosArchivosPageModule)
  },
  {
    path: 'pasarela-conteo',
    loadChildren: () => import('./pages/09-ReporteConteo/01-Pasarela/pasarela-conteo/pasarela-conteo.module').then( m => m.PasarelaConteoPageModule)
  },
  {
    path: 'lista-pedidos-disponibles',
    loadChildren: () => import('./pages/09-ReporteConteo/02-Disponibles/lista-pedidos-disponibles/lista-pedidos-disponibles.module').then( m => m.ListaPedidosDisponiblesPageModule)
  },
  {
    path: 'reporte-por-trazabilidad/:id',
    loadChildren: () => import('./pages/09-ReporteConteo/03-Reporte/reporte-por-trazabilidad/reporte-por-trazabilidad.module').then( m => m.ReportePorTrazabilidadPageModule)
  },
  {
    path: 'conteo-reportada-list',
    loadChildren: () => import('./pages/09-ReporteConteo/04-Reportada/conteo-reportada-list/conteo-reportada-list.module').then( m => m.ConteoReportadaListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
