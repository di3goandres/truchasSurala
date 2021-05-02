import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarelaMortalidadPageRoutingModule } from './pasarela-mortalidad-routing.module';

import { PasarelaMortalidadPage } from './pasarela-mortalidad.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

    PasarelaMortalidadPageRoutingModule,
    ComponentsModule

  ],
  declarations: [PasarelaMortalidadPage]
})
export class PasarelaMortalidadPageModule {}
