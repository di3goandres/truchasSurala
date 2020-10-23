import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortalidaddiariaPageRoutingModule } from './mortalidaddiaria-routing.module';

import { MortalidaddiariaPage } from './mortalidaddiaria.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MortalidaddiariaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MortalidaddiariaPage]
})
export class MortalidaddiariaPageModule {}
