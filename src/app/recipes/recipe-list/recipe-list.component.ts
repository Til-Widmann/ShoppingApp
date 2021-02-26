import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Spagetti', 'Who ate my spagetti', 'https://get.pxhere.com/photo/dish-food-cuisine-pasta-asian-food-' +
      'spaghetti-vegetarian-food-italian-italian-food-bolognese-carbonara-european-food-bucatini-pici-spagheti-853228.jpg'),
      new Recipe('Zwiebel Salat', 'Der Date Killer', 'https://get.pxhere.com/photo/dish-food-salad-pepper-' +
        'produce-vegetable-kitchen-cuisine-onion-flowering-plant-land-plant-99077.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
