import { Component, OnInit, Input } from '@angular/core';

import { Legend } from '../../Legend.model';

@Component({
  selector: 'app-Legend-item',
  templateUrl: './Legend-item.component.html',
  styleUrls: ['./Legend-item.component.css']
})
export class LegendItemComponent implements OnInit {
  @Input() Legend: Legend;
  @Input() index: number;

  ngOnInit() {
  }
}
