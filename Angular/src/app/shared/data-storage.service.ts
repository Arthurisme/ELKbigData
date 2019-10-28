import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {

  }


  //HttpHeaders headers1 = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  headers1 = new HttpHeaders().set('Access-Control-Allow-Origin', 'localhost');

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Max-Age': '3600',

      'Access-Control-Allow-Credentials': 'true'
    })
  };


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(startDate: string, endDate: string, pageNumber?: number) {

    if(startDate === undefined || endDate === undefined){
      return ;
    }


    //return this.http.get('http://localhost:8001/api/welcome', httpOptions);
    //return this.http.get('http://localhost:8001/api/legend/v1/legends/a/a');

    // let startDate = '2011-06-01';
    // let endDate = '2013-08-01';

    var urlString;

    if (pageNumber === null || pageNumber === undefined) {
      urlString = 'http://localhost:8001/api/legend/v1/legends/datebetween?startdate=' + startDate + '&enddate=' + endDate;

    } else {
      urlString = 'http://localhost:8001/api/legend/v1/legends/datebetween?startdate=' + startDate + '&enddate=' + endDate + '&page=' + pageNumber + '&size=25';
    }
    console.log('urlString:', urlString);


    return this.http
      .get<Recipe[]>(urlString)
      .pipe(
        map(recipes => {
          console.log('data:', recipes);
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  fetchRecipe(uuid: string) {


    return this.http
      .get<Recipe>(
        'http://localhost:8001/api/legend/v1/legends/' + uuid
      )
      .pipe(
        map(recipe => {
          console.log('data:', recipe);
          return recipe;
        }),
        tap(recipe => {
          this.recipeService.setRecipe(recipe);
        })
      );
  }

}
