import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'travel',
    loadChildren: () =>
      import('./travel/travel.module').then((m) => m.TravelModule),
  },
  {
    path: '**',
    redirectTo: 'travel',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
