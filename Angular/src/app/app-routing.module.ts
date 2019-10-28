import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegendsComponent } from './Legends/Legends.component';

import { LegendStartComponent } from './Legends/Legend-start/Legend-start.component';
import { LegendDetailComponent } from './Legends/Legend-detail/Legend-detail.component';
import { LegendsResolverService } from './Legends/Legends-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/Legends', pathMatch: 'full' },
  {
    path: 'Legends',
    component: LegendsComponent,
    children: [
      { path: '', component: LegendStartComponent },
      {
        path: ':id',
        component: LegendDetailComponent,
        resolve: [LegendsResolverService]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
