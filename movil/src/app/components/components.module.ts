import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    MortalidadpreguntasComponent


  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PdfViewerModule,
    NgxChartsModule,
    FormsModule
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
    MortalidadpreguntasComponent


  ]
})
export class ComponentsModule { }
