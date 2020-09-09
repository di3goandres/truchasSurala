import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespachosPageRoutingModule } from './despachos-routing.module';

import { DespachosPage } from './despachos.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespachosPageRoutingModule, 
    ComponentsModule
  ],
  declarations: [DespachosPage]
})
export class DespachosPageModule {}
