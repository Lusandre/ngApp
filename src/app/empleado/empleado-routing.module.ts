import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoopComponent } from './coop/coop.component';

const routes: Routes = [
  {
    path: 'coop',
    component: CoopComponent,
  },
  {
    path: '**',
    redirectTo: 'coop',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoRoutingModule {}
