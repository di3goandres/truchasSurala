import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrazabilidadesPageRoutingModule } from './trazabilidades-routing.module';

import { TrazabilidadesPage } from './trazabilidades.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrazabilidadesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrazabilidadesPage]
})
export class TrazabilidadesPageModule {}
