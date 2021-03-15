import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  onSave(){
    const body = this.recipeService.recipeList;
    this.http.put('https://shopping-app-49280-default-rtdb.firebaseio.com/recipes.json', body)
      .subscribe((responseBody) =>{
        console.log(responseBody);
      })
  }
  onFetch(){
    this.http.get<Recipe[]>('https://shopping-app-49280-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(responseBody => {
        return responseBody.map(responseBody => {
          return {...responseBody, ingredients : responseBody.ingredients ? responseBody.ingredients: []}
        });
      }))
      .subscribe(responseBody => {
        this.recipeService.setRecipes( responseBody)
      })
  }
}
