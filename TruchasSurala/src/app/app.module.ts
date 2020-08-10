import { ShortNumberPipe } from './pipes/short-number.pipe';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTreeModule} from '@angular/material/tree'

import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table'

import { PedidosComponent } from './componentes/despacho/pedidos/pedidos.component';
import { DespachoactualComponent } from './componentes/cabecera/despachoactual/despachoactual.component';
import { AgregarpedidoComponent } from './componentes/despacho/agregarpedido/agregarpedido.component';
import { ListaComponent } from './componentes/distribucion/lista/lista.component';
import { ViewComponent } from './componentes/distribucion/view/view.component';
import { CreardistribucionComponent } from './componentes/distribucion/creardistribucion/creardistribucion.component';
import { SortByPipePipe } from './pipes/sort-by-pipe.pipe';
import { TrazabilidadesComponent } from './componentes/trazabilidades/trazabilidades.component';
import { TrazabilidadComponent } from './componentes/trazabilidades/trazabilidad/trazabilidad.component';

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
    TrazabilidadComponent

  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
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
    MatTableModule


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
