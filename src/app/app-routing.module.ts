import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {EmptyRecipeComponent} from './recipes/empty-recipe/empty-recipe.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const appRoutes = [
  { path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: EmptyRecipeComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent,},
      {path: ':id/edit', component: RecipeEditComponent}
    ]  },
  { path: 'shopping', component: ShoppingListComponent},
  { path: '',  redirectTo: '/recipes', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
