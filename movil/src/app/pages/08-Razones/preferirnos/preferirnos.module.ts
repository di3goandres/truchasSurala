import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreferirnosPageRoutingModule } from './preferirnos-routing.module';

import { PreferirnosPage } from './preferirnos.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferirnosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PreferirnosPage]
})
export class PreferirnosPageModule {}
