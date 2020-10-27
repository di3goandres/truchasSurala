import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InvitadosComponent } from './menu/invitados/invitados.component';
import { MenuusuarioComponent } from './menu/menuusuario/menuusuario.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ListafincasComponent } from './01-Fincas/listafincas/listafincas.component';
import { ListapedidosComponent } from './02-Pedidos/listapedidos/listapedidos.component';
import { VerfacturaComponent } from './02-Pedidos/verfactura/verfactura.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EstadisticaComponent } from './03-Estadistica/estadistica/estadistica.component';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { VerdespachosComponent } from './02-Pedidos/verdespachos/verdespachos.component';
import { TrazabilidadComponent } from './03-Trazabilidad/trazabilidad/trazabilidad.component';
import { MortalidadpreguntasComponent } from './04-Mortalidad/mortalidadpreguntas/mortalidadpreguntas.component';
import { CmedicamentoComponent } from './05-Productos/cmedicamento/cmedicamento.component';
import { ActualizarfotofincaComponent } from './01-Fincas/actualizarfotofinca/actualizarfotofinca.component';
import { UnicafincaComponent } from './01-Fincas/unicafinca/unicafinca.component';
import { GuiaComponent } from './06-Guias/guia/guia.component';
import { PoliticasmortalidadComponent } from './04-Mortalidad/politicasmortalidad/politicasmortalidad.component';
import { CalendarioComponent } from './00-Comunes/01-calendario/calendario/calendario.component';
// import { CalendarModule } from 'ion2-calendar';
import { MortalidadpedidosComponent } from './02-Pedidos/mortalidadpedidos/mortalidadpedidos.component';
import { ListafotosComponent } from './00-Comunes/listafotos/listafotos.component';
import { ListareportestecnicosComponent } from './02-Pedidos/listareportestecnicos/listareportestecnicos.component';
import { ModalreporteComponent } from './02-Pedidos/modalreporte/modalreporte.component';


@NgModule({
  declarations: [
    HeaderComponent,
    InvitadosComponent,
    MenuusuarioComponent,
    ListafincasComponent,
    ListapedidosComponent,
    VerfacturaComponent,
    EstadisticaComponent,
    VerdespachosComponent,
    TrazabilidadComponent,
    MortalidadpreguntasComponent,
    CmedicamentoComponent,
    ActualizarfotofincaComponent,
    UnicafincaComponent,
    GuiaComponent,
    PoliticasmortalidadComponent,
    CalendarioComponent,
    MortalidadpedidosComponent,
    ListafotosComponent,
    ListareportestecnicosComponent,
    ModalreporteComponent



  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PdfViewerModule,
    NgxChartsModule,
    FormsModule,
    // CalendarModule

    

  ],
  exports: [
    HeaderComponent,
    InvitadosComponent,
    MenuusuarioComponent,
    ListafincasComponent,
    ListafincasComponent,
    ListapedidosComponent,
    VerfacturaComponent,
    EstadisticaComponent,
    VerdespachosComponent,
    TrazabilidadComponent,
    MortalidadpreguntasComponent,
    CmedicamentoComponent,
    ActualizarfotofincaComponent,
    UnicafincaComponent,
    GuiaComponent,
    PoliticasmortalidadComponent,
    CalendarioComponent,
    MortalidadpedidosComponent,
    ListafotosComponent,
    ListareportestecnicosComponent,
    ModalreporteComponent


  ],

  
  
})
export class ComponentsModule { }
