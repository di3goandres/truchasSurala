import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistromortalidadPageRoutingModule } from './registromortalidad-routing.module';

import { RegistromortalidadPage } from './registromortalidad.page';
import { ComponentsModule } from '../../../components/components.module';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistromortalidadPageRoutingModule,
    ComponentsModule

  ],
  declarations: [RegistromortalidadPage],
  providers: [DatePicker]
})
export class RegistromortalidadPageModule {}
