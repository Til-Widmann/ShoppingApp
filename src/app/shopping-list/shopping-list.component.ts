import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Tomaten', 5),
    new Ingredient('Zwiebel', 1)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addEvent(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
}
