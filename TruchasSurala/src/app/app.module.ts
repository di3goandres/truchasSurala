import { ShortNumberPipe } from './pipes/short-number.pipe';


import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import {MatDividerModule} from '@angular/material/divider';
import {MatTreeModule} from '@angular/material/tree'

import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table'
import {MatStepperModule} from '@angular/material/stepper';

import { MatPaginatorModule } from '@angular/material/paginator';

import { PedidosComponent } from './componentes/despacho/pedidos/pedidos.component';
import { DespachoactualComponent } from './componentes/cabecera/despachoactual/despachoactual.component';
import { AgregarpedidoComponent } from './componentes/despacho/agregarpedido/agregarpedido.component';
import { ListaComponent } from './componentes/distribucion/lista/lista.component';
import { ViewComponent } from './componentes/distribucion/view/view.component';
import { CreardistribucionComponent } from './componentes/distribucion/creardistribucion/creardistribucion.component';
import { SortByPipePipe } from './pipes/sort-by-pipe.pipe';
import { TrazabilidadesComponent } from './componentes/trazabilidades/trazabilidades.component';
import { TrazabilidadComponent } from './componentes/trazabilidades/trazabilidad/trazabilidad.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {registerLocaleData} from '@angular/common'
import  localCo from '@angular/common/locales/es-CO';
import { DepartamentosComponent } from './componentes/01-Comunes/departamentos/departamentos.component';
import { ActualizarComponent } from './componentes/02-Usuario/02-update/actualizar/actualizar.component';
import { ListausuarioComponent } from './componentes/02-Usuario/01-lista/listausuario/listausuario.component';
import { ListafincasComponent } from './componentes/02-Usuario/03-Fincas/listafincas/listafincas.component';
import { PasswordComponent } from './componentes/02-Usuario/04-update/password/password.component';
import { FincaupdateComponent } from './componentes/02-Usuario/04-update/fincaupdate/fincaupdate.component';


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
    ListaComponent,
    ViewComponent,
    CreardistribucionComponent,
    SortByPipePipe,
    TrazabilidadesComponent,
    TrazabilidadComponent,
    DepartamentosComponent,
    ListausuarioComponent,
    ActualizarComponent,
    ListafincasComponent,
    PasswordComponent,
    FincaupdateComponent,


  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,ReactiveFormsModule,
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
    MatPaginatorModule


  ],

  providers: [
    {provide: LOCALE_ID, useValue: 'es-Co'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearence: 'fill'}},
    DatePipe,
    MatDatepickerModule,
    DespachosComponent],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
