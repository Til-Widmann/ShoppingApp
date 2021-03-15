import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  recipe: Recipe;
  recipeForm: FormGroup
  editMode: boolean

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        if (this.id != null) {
          this.recipe = this.recipeService.getRecipeById(this.id);
          this.editMode = true;
        }
      }
    )
    this.initForm()
  }
  private initForm() {
    let recipeIngredients = new FormArray([]);
    if (this.recipe){
      if (this.recipe.ingredients) {
        this.recipe.ingredients.forEach((ingredient) => recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        ))
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe !== undefined ? this.recipe.name : '', Validators.required),
      'imagePath': new FormControl(this.recipe !== undefined ? this.recipe.imagePath : '', Validators.required),
      'description': new FormControl(this.recipe !== undefined ? this.recipe.description : '', Validators.required),
      'ingredients': recipeIngredients
      }
    );
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onSubmit() {
    if (!this.editMode) {
      this.recipeService.addRecipe(this.recipeForm.value)
      return;
    }
    this.recipeService.editRecipe(this.id, this.recipeForm.value)
    this.editMode = false;

  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}
