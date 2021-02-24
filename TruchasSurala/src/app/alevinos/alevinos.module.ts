import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlevinosRoutingModule } from './alevinos-routing.module';
import { MontajePedidoComponent } from './01-Montaje/montaje-pedido/montaje-pedido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlevinosprogramcionComponent } from './02-Programacion/alevinosprogramcion/alevinosprogramcion.component';
import { ListaPedidoAlevinosComponent } from './03-Lista/lista-pedido-alevinos/lista-pedido-alevinos.component';
import { DiaDespachoComponent } from './04-DiaDespacho/dia-despacho/dia-despacho.component';
import { PedidosClientesComponent } from './05-Clientes/pedidos-clientes/pedidos-clientes.component';
import { EditarMontajeComponent } from './01-Montaje/editar-montaje/editar-montaje.component';


@NgModule({
  declarations: [
    MontajePedidoComponent,
    AlevinosprogramcionComponent,
    ListaPedidoAlevinosComponent,
    DiaDespachoComponent,
    PedidosClientesComponent,
    EditarMontajeComponent],
  imports: [
    CommonModule,
    AlevinosRoutingModule,
    FormsModule, HttpClientModule, ReactiveFormsModule,
   

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
    TextFieldModule,
    MatListModule,
    MatChipsModule,
    MatSnackBarModule
  ]
})
export class AlevinosModule { }
