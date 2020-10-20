import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortalidadpedidosPageRoutingModule } from './mortalidadpedidos-routing.module';

import { MortalidadpedidosPage } from './mortalidadpedidos.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MortalidadpedidosPageRoutingModule,
    ComponentsModule

  ],
  declarations: [MortalidadpedidosPage]
})
export class MortalidadpedidosPageModule {}
