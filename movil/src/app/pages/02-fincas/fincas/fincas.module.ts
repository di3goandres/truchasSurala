import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FincasPageRoutingModule } from './fincas-routing.module';

import { FincasPage } from './fincas.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FincasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FincasPage]
})
export class FincasPageModule {}
