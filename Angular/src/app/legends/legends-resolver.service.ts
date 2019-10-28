import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Legend } from './Legend.model';
import { DataStorageService } from '../shared/data-storage.service';
import { LegendService } from './Legend.service';

@Injectable({ providedIn: 'root' })
export class LegendsResolverService implements Resolve<Legend[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private LegendsService: LegendService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const Legends = this.LegendsService.getLegends();

    if (Legends.length === 0) {
     // todo: emit the datepicker value to here for use.
      // return this.dataStorageService.fetchLegends();
    } else {
      return Legends;
    }
  }
}
