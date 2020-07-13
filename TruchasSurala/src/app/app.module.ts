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

import {MatSelectModule} from '@angular/material/select';


// Datepicker module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { AgregarcajaComponent } from './componentes/despacho/agregarcaja/agregarcaja.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PedidosComponent } from './componentes/despacho/pedidos/pedidos.component';
import { DespachoactualComponent } from './componentes/cabecera/despachoactual/despachoactual.component';
import { AgregarpedidoComponent } from './componentes/despacho/agregarpedido/agregarpedido.component';
import { ListaComponent } from './componentes/distribucion/lista/lista.component';
import { ViewComponent } from './componentes/distribucion/view/view.component';
import { CreardistribucionComponent } from './componentes/distribucion/creardistribucion/creardistribucion.component';

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

  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatSelectModule


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
