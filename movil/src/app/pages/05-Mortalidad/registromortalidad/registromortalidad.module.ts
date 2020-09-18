import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistromortalidadPageRoutingModule } from './registromortalidad-routing.module';

import { RegistromortalidadPage } from './registromortalidad.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistromortalidadPageRoutingModule,
    ComponentsModule

  ],
  declarations: [RegistromortalidadPage]
})
export class RegistromortalidadPageModule {}
