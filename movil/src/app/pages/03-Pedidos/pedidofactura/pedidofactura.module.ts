import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidofacturaPageRoutingModule } from './pedidofactura-routing.module';

import { PedidofacturaPage } from './pedidofactura.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidofacturaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PedidofacturaPage]
})
export class PedidofacturaPageModule {}
