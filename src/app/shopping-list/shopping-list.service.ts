import {Injectable,  OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{

  startedEdit = new Subject<number>();

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

  getIngedientByIndex(index: number) {
    return this._ingredients[index]
  }
  updateIngredient(index: number, ingredient: Ingredient){
    this._ingredients[index] = ingredient;
  }
  delete(index: number){
    this._ingredients.splice(index,1)
  }

}
