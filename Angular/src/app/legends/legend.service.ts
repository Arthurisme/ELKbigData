import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Legend } from './Legend.model';
import { Ingredient } from '../shared/ingredient.model';


@Injectable()
export class LegendService {
  LegendsChanged = new Subject<Legend[]>();
  LegendChanged = new Subject<Legend>();

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
  private Legends: Legend[] = [];
  private currentClickedLegend: Legend;

  constructor() {}

  setLegends(Legends: Legend[]) {

    console.log('data 2:', Legends );

    this.Legends = Legends;

    this.LegendsChanged.next(this.Legends.slice());
  }

  setLegend(currentClickedLegend: Legend) {

    console.log('data 3:', currentClickedLegend );

    this.currentClickedLegend = currentClickedLegend;

    this.LegendChanged.next(this.currentClickedLegend);
  }

  getLegends() {
    return this.Legends.slice();
  }

  getLegend(index: string) {
    return this.currentClickedLegend;
  }

  getCurrentLegend() {
    return this.currentClickedLegend;
  }



  addLegend(Legend: Legend) {
    this.Legends.push(Legend);
    this.LegendsChanged.next(this.Legends.slice());
  }

  updateLegend(index: string, newLegend: Legend) {
    this.Legends[index] = newLegend;
    this.LegendsChanged.next(this.Legends.slice());
  }


}
