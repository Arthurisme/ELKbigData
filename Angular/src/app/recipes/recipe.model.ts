import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public type: string;
  public size: string;
  public uuid: string;
  public eventdate: string;
  public detail: string;
  public summary: string;



  public name: string;

  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(summary: string, name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.summary = summary;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
