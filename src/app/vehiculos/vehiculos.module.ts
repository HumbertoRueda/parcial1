import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoListComponent } from './vehiculo-list/vehiculo-list.component';

@NgModule({
  declarations: [VehiculoListComponent],
  imports: [CommonModule],
  exports: [VehiculoListComponent]
})
export class VehiculosModule {}
