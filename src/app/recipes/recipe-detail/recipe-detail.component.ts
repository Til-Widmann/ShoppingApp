import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index: number;


  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = params['id']
        this.recipe = this.recipeService.getRecipeById(this.index)
      }
    )
  }

  addToShoppingList(){
    this.recipe.ingredients.forEach(i => this.shoppingListService.onAddEvent(i))
  }

  onDelete(index: number){
    this.recipeService.deleteRecipe(index)
  }
}
