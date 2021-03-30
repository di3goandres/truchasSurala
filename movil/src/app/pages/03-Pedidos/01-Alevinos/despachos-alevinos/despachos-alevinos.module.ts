import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespachosAlevinosPageRoutingModule } from './despachos-alevinos-routing.module';

import { DespachosAlevinosPage } from './despachos-alevinos.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespachosAlevinosPageRoutingModule,
    ComponentsModule

  ],
  declarations: [DespachosAlevinosPage]
})
export class DespachosAlevinosPageModule {}
