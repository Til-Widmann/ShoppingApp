import {Injectable, EventEmitter, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {RecipeService} from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{
  private _ingredients: Ingredient[] = [
    new Ingredient('Tomaten', 5),
    new Ingredient('Zwiebel', 1)
  ];


  ngOnInit(): void {

  }
  onAddEvent(ingredient: Ingredient){
    this._ingredients.push(ingredient);
  }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }


}
