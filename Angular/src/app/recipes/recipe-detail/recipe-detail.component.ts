import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  subscription: Subscription;
  id: string;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log('  params:', params );

          this.id = params.id;
          console.log('id of params:', this.id );

          this.onFetchRecipe(this.id);
          //this.recipe = this.recipeService.getRecipe(this.id);
        }
      );

    this.subscription = this.recipeService.recipeChanged
      .subscribe(
        (recipe) => {
          this.recipe = recipe;
        }
      );
    this.recipe = this.recipeService.getCurrentRecipe();
  }




  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onFetchRecipe(uuid: string) {
    this.dataStorageService.fetchRecipe(uuid).subscribe();
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
