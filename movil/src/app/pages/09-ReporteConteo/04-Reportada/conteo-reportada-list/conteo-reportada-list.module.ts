import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConteoReportadaListPageRoutingModule } from './conteo-reportada-list-routing.module';

import { ConteoReportadaListPage } from './conteo-reportada-list.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConteoReportadaListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConteoReportadaListPage]
})
export class ConteoReportadaListPageModule {}
