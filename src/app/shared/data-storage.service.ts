import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  onSave() {
    this.authService.user.pipe(take(1)).subscribe();
    const body = this.recipeService.recipeList;
    this.http.put(
      'https://shopping-app-49280-default-rtdb.firebaseio.com/recipes.json',
      body
    )
      .subscribe((responseBody) => {
        console.log(responseBody);
      });
  }

  onFetch() {
    return this.http.get<Recipe[]>('https://shopping-app-49280-default-rtdb.firebaseio.com/recipes.json',
    )
      .pipe(map(responseBody => {
          return responseBody.map(responseBody => {
            return {
              ...responseBody,
              ingredients: responseBody.ingredients ? responseBody.ingredients : []
            };
          });
        }),
        tap(responseBody => {
          this.recipeService.setRecipes(responseBody);
        })
      ).subscribe()//produces memory leak workaround
  }
}
