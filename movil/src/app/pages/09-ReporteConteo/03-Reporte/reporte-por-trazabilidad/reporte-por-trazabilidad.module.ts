import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportePorTrazabilidadPageRoutingModule } from './reporte-por-trazabilidad-routing.module';

import { ReportePorTrazabilidadPage } from './reporte-por-trazabilidad.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportePorTrazabilidadPageRoutingModule,
    ComponentsModule

  ],
  declarations: [ReportePorTrazabilidadPage]
})
export class ReportePorTrazabilidadPageModule {}
