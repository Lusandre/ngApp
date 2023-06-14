import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuscarInputComponent } from './buscar-input/buscar-input.component';

@NgModule({
  declarations: [BuscarInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [BuscarInputComponent],
})
export class SharedModule {}
