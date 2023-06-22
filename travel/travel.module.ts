import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelRoutingModule } from './travel-routing.module';
import { CoopComponent } from './admin/coop/coop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerCoopComponent } from './admin/ver-coop/ver-coop.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CoopComponent, VerCoopComponent],
  imports: [
    CommonModule,
    TravelRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TravelModule {}
