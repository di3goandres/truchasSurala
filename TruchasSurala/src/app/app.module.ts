import { ShortNumberPipe } from './pipes/short-number.pipe';


import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DefaultComponent } from './componentes/default/default.component';
import { ErrorComponent } from './componentes/error/error.component';
import { InvitadoComponent } from './componentes/invitado/invitado.component';
import { DespachoComponent } from './componentes/despacho/despacho.component';
import { DespachosComponent } from './componentes/despachos/despachos.component';
import { BandejascajaComponent } from './componentes/bandejascaja/bandejascaja.component';
import { CrearComponent } from './componentes/despacho/crear/crear.component';

import { MatSelectModule } from '@angular/material/select';

import { MatRadioModule } from '@angular/material/radio';
// Datepicker module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { AgregarcajaComponent } from './componentes/despacho/agregarcaja/agregarcaja.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree'

import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PedidosComponent } from './componentes/despacho/pedidos/pedidos.component';
import { DespachoactualComponent } from './componentes/cabecera/despachoactual/despachoactual.component';
import { AgregarpedidoComponent } from './componentes/despacho/agregarpedido/agregarpedido.component';

import { SortByPipePipe } from './pipes/sort-by-pipe.pipe';
import { TrazabilidadesComponent } from './componentes/trazabilidades/trazabilidades.component';
import { TrazabilidadComponent } from './componentes/trazabilidades/trazabilidad/trazabilidad.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common'
import localCo from '@angular/common/locales/es-CO';
import { DepartamentosComponent } from './componentes/01-Comunes/departamentos/departamentos.component';
import { ActualizarComponent } from './componentes/02-Usuario/02-update/actualizar/actualizar.component';
import { ListausuarioComponent } from './componentes/02-Usuario/01-lista/listausuario/listausuario.component';
import { ListafincasComponent } from './componentes/02-Usuario/03-Fincas/listafincas/listafincas.component';
import { PasswordComponent } from './componentes/02-Usuario/04-update/password/password.component';
import { FincaupdateComponent } from './componentes/02-Usuario/04-update/fincaupdate/fincaupdate.component';
import { DistribuciongloballistComponent } from './componentes/03-Distribucion/distribuciongloballist/distribuciongloballist.component';

import { CantidaddespachadoComponent } from './componentes/04-Estadistica/cantidaddespachado/cantidaddespachado.component';
import { CreardespachoComponent } from './componentes/05-Despacho/creardespacho/creardespacho.component';
import { RegistroExitosoComponent } from './componentes/01-Comunes/registro-exitoso/registro-exitoso.component';
import { VerlistardespachosComponent } from './componentes/05-Despacho/verlistardespachos/verlistardespachos.component';
import { EditardespachoComponent } from './componentes/05-Despacho/editardespacho/editardespacho.component';
import { ListapedidosComponent } from './componentes/06-Pedidos/listapedidos/listapedidos.component';
import { CrearpedidosComponent } from './componentes/06-Pedidos/crearpedidos/crearpedidos.component';
import { ListausuariosComponent } from './componentes/06-Pedidos/listausuarios/listausuarios.component';
import { EditarpedidoComponent } from './componentes/06-Pedidos/editarpedido/editarpedido.component';
import { BorrarpedidoComponent } from './componentes/06-Pedidos/borrarpedido/borrarpedido.component';
import { AsociarfacturaComponent } from './componentes/06-Pedidos/asociarfactura/asociarfactura.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ListapedidosfacturaComponent } from './componentes/06-Pedidos/listapedidosfactura/listapedidosfactura.component';
import { ListadespachosfacturaComponent } from './componentes/06-Pedidos/listadespachosfactura/listadespachosfactura.component';
import { AsociarfincaComponent } from './componentes/02-Usuario/03-Fincas/asociarfinca/asociarfinca.component';
import { VerdistribucionComponent } from './componentes/07-Distribucion/verdistribucion/verdistribucion.component';
import { DistribucioncrearComponent } from './componentes/07-Distribucion/distribucioncrear/distribucioncrear.component';
import { AsociarcertificadoComponent } from './componentes/05-Despacho/asociarcertificado/asociarcertificado.component';
import { InformesTecnicosComponent } from './componentes/08-Fincas/informes-tecnicos/informes-tecnicos.component';
import { CrearinformesTecnicosComponent } from './componentes/08-Fincas/crearinformes-tecnicos/crearinformes-tecnicos.component';
import { FiltroPipe } from './pipes/01-Filter/filtro.pipe';
import { VerusuarioComponent } from './componentes/02-Usuario/verusuario/verusuario.component';

import { AuthInterceptor } from './service/interceptor/auth.interceptor';
import { UserService } from './service/user/user.service';


registerLocaleData(localCo);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    ErrorComponent,
    InvitadoComponent,
    DespachoComponent,
    DespachosComponent,
    BandejascajaComponent,
    CrearComponent,
    AgregarcajaComponent,
    ShortNumberPipe,
    PedidosComponent,
    DespachoactualComponent,
    AgregarpedidoComponent,
    SortByPipePipe,
    TrazabilidadesComponent,
    TrazabilidadComponent,
    DepartamentosComponent,
    ListausuarioComponent,
    ActualizarComponent,
    ListafincasComponent,
    PasswordComponent,
    FincaupdateComponent,
    DistribuciongloballistComponent, CantidaddespachadoComponent, CreardespachoComponent,
    RegistroExitosoComponent, VerlistardespachosComponent, EditardespachoComponent, ListapedidosComponent,
    CrearpedidosComponent, ListausuariosComponent,
    EditarpedidoComponent, BorrarpedidoComponent,
    AsociarfacturaComponent, ListapedidosfacturaComponent,
    ListadespachosfacturaComponent, AsociarfincaComponent, VerdistribucionComponent,
    DistribucioncrearComponent, AsociarcertificadoComponent,
    InformesTecnicosComponent,
    CrearinformesTecnicosComponent,
    FiltroPipe,
    
    VerusuarioComponent


  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatTreeModule,
    MatTableModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    MatRadioModule,
    NgxChartsModule,
    PdfViewerModule,



  ],

  providers: [
    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-Co' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearence: 'fill' } },
    
    DatePipe,
    MatDatepickerModule, ListapedidosComponent, DespachoactualComponent,
    DespachosComponent,
   
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
