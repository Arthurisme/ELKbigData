import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Legend } from './legend.model';
import { DataStorageService } from '../shared/data-storage.service';
import { LegendService } from './legend.service';

@Injectable({ providedIn: 'root' })
export class LegendsResolverService implements Resolve<Legend[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private legendsService: LegendService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const legends = this.legendsService.getLegends();

    if (legends.length === 0) {
     // todo: emit the datepicker value to here for use.
      // return this.dataStorageService.fetchLegends();
    } else {
      return legends;
    }
  }
}
