import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { PhonePipe } from './phone.pipe';



@NgModule({
  declarations: [FiltroPipe, PhonePipe],
  exports:[FiltroPipe, PhonePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
