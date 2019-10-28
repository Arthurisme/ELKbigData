import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Legend} from '../Legend.model';
import {LegendService} from '../Legend.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-Legend-detail',
  templateUrl: './Legend-detail.component.html',
  styleUrls: ['./Legend-detail.component.css']
})
export class LegendDetailComponent implements OnInit {
  Legend: Legend;
  subscription: Subscription;
  id: string;

  constructor(private LegendService: LegendService,
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
          // this.Legend = this.LegendService.getLegend(this.id);
        }
      );

    this.subscription = this.LegendService.LegendChanged
      .subscribe(
        (Legend) => {
          this.Legend = Legend;
        }
      );
    this.Legend = this.LegendService.getCurrentLegend();
  }




  onFetchLegend(uuid: string) {
    this.dataStorageService.fetchLegend(uuid).subscribe();
  }


}
