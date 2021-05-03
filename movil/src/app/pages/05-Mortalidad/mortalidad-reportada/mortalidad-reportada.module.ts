import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortalidadReportadaPageRoutingModule } from './mortalidad-reportada-routing.module';

import { MortalidadReportadaPage } from './mortalidad-reportada.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

    MortalidadReportadaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MortalidadReportadaPage]
})
export class MortalidadReportadaPageModule {}
