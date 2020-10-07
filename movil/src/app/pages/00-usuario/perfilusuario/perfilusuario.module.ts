import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilusuarioPageRoutingModule } from './perfilusuario-routing.module';

import { PerfilusuarioPage } from './perfilusuario.page';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilusuarioPageRoutingModule,
    ComponentsModule,
    PipesModule
    
  ],
  declarations: [PerfilusuarioPage]
})
export class PerfilusuarioPageModule {}
