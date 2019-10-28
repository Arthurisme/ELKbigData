import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegendsComponent } from './legends/legends.component';

import { LegendStartComponent } from './legends/legend-start/legend-start.component';
import { LegendDetailComponent } from './legends/legend-detail/legend-detail.component';
import { LegendsResolverService } from './legends/legends-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/legends', pathMatch: 'full' },
  {
    path: 'legends',
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
