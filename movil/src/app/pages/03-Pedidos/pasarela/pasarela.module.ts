import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarelaPageRoutingModule } from './pasarela-routing.module';

import { PasarelaPage } from './pasarela.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasarelaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PasarelaPage]
})
export class PasarelaPageModule {}
