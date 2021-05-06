import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarelaConteoPageRoutingModule } from './pasarela-conteo-routing.module';

import { PasarelaConteoPage } from './pasarela-conteo.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasarelaConteoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PasarelaConteoPage]
})
export class PasarelaConteoPageModule {}
