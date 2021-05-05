import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlevinosArchivosPageRoutingModule } from './alevinos-archivos-routing.module';

import { AlevinosArchivosPage } from './alevinos-archivos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlevinosArchivosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AlevinosArchivosPage]
})
export class AlevinosArchivosPageModule {}
