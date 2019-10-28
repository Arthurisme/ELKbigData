import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Legend } from './legend.model';
import { Ingredient } from '../shared/ingredient.model';


@Injectable()
export class LegendService {
  legendsChanged = new Subject<Legend[]>();
  legendChanged = new Subject<Legend>();

  // private Legends: Legend[] = [
  //   new Legend(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Legend(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private legends: Legend[] = [];
  private currentClickedLegend: Legend;

  constructor() {}

  setLegends(legends: Legend[]) {

    console.log('data 2:', legends );

    this.legends = legends;

    this.legendsChanged.next(this.legends.slice());
  }

  setLegend(currentClickedLegend: Legend) {

    console.log('data 3:', currentClickedLegend );

    this.currentClickedLegend = currentClickedLegend;

    this.legendChanged.next(this.currentClickedLegend);
  }

  getLegends() {
    return this.legends.slice();
  }

  getLegend(index: string) {
    return this.currentClickedLegend;
  }

  getCurrentLegend() {
    return this.currentClickedLegend;
  }



  addLegend(legend: Legend) {
    this.legends.push(legend);
    this.legendsChanged.next(this.legends.slice());
  }

  updateLegend(index: string, newLegend: Legend) {
    this.legends[index] = newLegend;
    this.legendsChanged.next(this.legends.slice());
  }


}
