import { Component, OnInit, Input } from '@angular/core';

import { Legend } from '../../legend.model';

@Component({
  selector: 'app-legend-item',
  templateUrl: './legend-item.component.html',
  styleUrls: ['./legend-item.component.css']
})
export class LegendItemComponent implements OnInit {
  @Input() legend: Legend;
  @Input() index: number;

  ngOnInit() {
  }
}
