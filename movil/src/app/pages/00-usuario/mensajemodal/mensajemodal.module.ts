import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajemodalPageRoutingModule } from './mensajemodal-routing.module';

import { MensajemodalPage } from './mensajemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajemodalPageRoutingModule
  ],
  declarations: [MensajemodalPage]
})
export class MensajemodalPageModule {}
