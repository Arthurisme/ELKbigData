import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeChanged = new Subject<Recipe>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private recipes: Recipe[] = [];
  private currentClickedRecipe: Recipe;

  constructor() {}

  setRecipes(recipes: Recipe[]) {

    console.log('data 2:', recipes );

    this.recipes = recipes;

    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipe(currentClickedRecipe: Recipe) {

    console.log('data 3:', currentClickedRecipe );

    this.currentClickedRecipe = currentClickedRecipe;

    this.recipeChanged.next(this.currentClickedRecipe);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: string) {
    return this.currentClickedRecipe;
  }

  getCurrentRecipe() {
    return this.currentClickedRecipe;
  }



  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: string, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }


}
