import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiasmanejoPageRoutingModule } from './guiasmanejo-routing.module';

import { GuiasmanejoPage } from './guiasmanejo.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiasmanejoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GuiasmanejoPage]
})
export class GuiasmanejoPageModule {}
