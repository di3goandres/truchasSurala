import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipomortalidadPageRoutingModule } from './tipomortalidad-routing.module';

import { TipomortalidadPage } from './tipomortalidad.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipomortalidadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TipomortalidadPage]
})
export class TipomortalidadPageModule {}
