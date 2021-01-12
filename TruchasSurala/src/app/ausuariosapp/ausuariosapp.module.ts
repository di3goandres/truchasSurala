import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AusuariosappRoutingModule } from './ausuariosapp-routing.module';
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
import { NuevoUsuarioComponent } from './00-Agregar/nuevo-usuario/nuevo-usuario.component';
import { ListaUsuariosAPPComponent } from './01-Lista/lista-usuarios-app/lista-usuarios-app.component';
import { SinpermisoComponent } from './00-Permisos/sinpermiso/sinpermiso.component';


@NgModule({
  declarations: [NuevoUsuarioComponent, ListaUsuariosAPPComponent, SinpermisoComponent],
  imports: [
    CommonModule,
    AusuariosappRoutingModule,
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
export class AusuariosappModule { }
