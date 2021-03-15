import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  // private _recipeList: Recipe[] = [
  //   new Recipe(
  //     'Spagetti',
  //     'Who ate my spagetti',
  //     'https://get.pxhere.com/photo/dish-food-cuisine-pasta-asian-food-' +
  //     'spaghetti-vegetarian-food-italian-italian-food-bolognese-carbonara-european-food-bucatini-pici-spagheti-853228.jpg',
  //     [new Ingredient('Hack', 500),
  //               new Ingredient('Nudeln', 200)
  //     ]),
  //   new Recipe(
  //     'Zwiebel Salat',
  //     'Der Date Killer',
  //     'https://get.pxhere.com/photo/dish-food-salad-pepper-' +
  //     'produce-vegetable-kitchen-cuisine-onion-flowering-plant-land-plant-99077.jpg',
  //     [new Ingredient('Zwiebel', 5),
  //               new Ingredient('Oliven Öl', 50)])
  // ];
  private _recipeList: Recipe[];

  addRecipe(recipe: Recipe){
    this._recipeList.push(recipe);
  }
  editRecipe(index: number, recipe: Recipe){
    this._recipeList[index] = recipe;
  }
  setRecipes(recipes: Recipe[]){
    this._recipeList = recipes;
    this.recipeChanged.next(this.recipeList)
  }
  get recipeList(): Recipe[] {
    return this._recipeList;
  }
  getRecipeById(id: number){
    return this.recipeList[id];
  }
  deleteRecipe(index: number) {
    this._recipeList.splice(index, 1);
  }
}
