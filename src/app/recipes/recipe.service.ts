import { Injectable , EventEmitter} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipeToShoppingList = new EventEmitter<Ingredient[]>();

  private _recipeList: Recipe[] = [
    new Recipe(
      'Spagetti',
      'Who ate my spagetti',
      'https://get.pxhere.com/photo/dish-food-cuisine-pasta-asian-food-' +
      'spaghetti-vegetarian-food-italian-italian-food-bolognese-carbonara-european-food-bucatini-pici-spagheti-853228.jpg',
      [new Ingredient('Hack', 500),
                new Ingredient('Nudeln', 200)
      ]),
    new Recipe(
      'Zwiebel Salat',
      'Der Date Killer',
      'https://get.pxhere.com/photo/dish-food-salad-pepper-' +
      'produce-vegetable-kitchen-cuisine-onion-flowering-plant-land-plant-99077.jpg',
      [new Ingredient('Zwiebel', 5),
                new Ingredient('Oliven Öl', 50)])
  ];


  get recipeList(): Recipe[] {
    return this._recipeList;
  }
}
