import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerCoopComponent } from './ver-coop/ver-coop.component';
import { CoopComponent } from './coop/coop.component';
import { UserComponent } from './user/user.component';
import { VerUserComponent } from './ver-user/ver-user.component';
import { AdminComponent } from './admin.component';
import { TravelAppComponent } from './travel-app/travel-app.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'user/:id',
        component: VerUserComponent,
      },
      {
        path: 'coop',
        component: CoopComponent,
      },
      {
        path: 'coop/:id',
        component: VerCoopComponent,
      },
      {
        path: 'travel',
        component: TravelAppComponent,
      },
      {
        path: '**',
        redirectTo: 'user',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
