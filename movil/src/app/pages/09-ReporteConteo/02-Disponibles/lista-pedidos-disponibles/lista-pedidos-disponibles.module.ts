import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPedidosDisponiblesPageRoutingModule } from './lista-pedidos-disponibles-routing.module';

import { ListaPedidosDisponiblesPage } from './lista-pedidos-disponibles.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPedidosDisponiblesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaPedidosDisponiblesPage]
})
export class ListaPedidosDisponiblesPageModule {}
