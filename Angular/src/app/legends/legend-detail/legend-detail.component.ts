import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Legend} from '../legend.model';
import {LegendService} from '../legend.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-legend-detail',
  templateUrl: './legend-detail.component.html',
  styleUrls: ['./legend-detail.component.css']
})
export class LegendDetailComponent implements OnInit {
  legend: Legend;
  subscription: Subscription;
  id: string;

  constructor(private legendService: LegendService,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log('  params:', params);

          this.id = params.id;
          console.log('id of params:', this.id);

          this.onFetchLegend(this.id);
          // this.legend = this.legendService.getLegend(this.id);
        }
      );

    this.subscription = this.legendService.legendChanged
      .subscribe(
        (legend) => {
          this.legend = legend;
        }
      );
    this.legend = this.legendService.getCurrentLegend();
  }




  onFetchLegend(uuid: string) {
    this.dataStorageService.fetchLegend(uuid).subscribe();
  }


}
