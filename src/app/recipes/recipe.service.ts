import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChange = new Subject();
  private recipes: Recipe[] = [
    new Recipe('Idli',
      'Idli or idly are a type of savoury rice cake, originating from the Indian subcontinent, popular as breakfast foods in southern India and northern Sri Lanka.',
      'https://vaya.in/recipes/wp-content/uploads/2018/02/Idli-and-Sambar-1.jpg',
      [
        new Ingredient('rice', 1)
      ]
    ),
    new Recipe('Cake ',
      'Cake is a form of sweet dessert that is typically baked.',
      'https://happycakestudio.files.wordpress.com/2017/11/img_3546.jpg?w=1277&h=1277',
      [
        new Ingredient('chocolate', 3),
        new Ingredient('sugar', 1)
      ]
    ),
    new Recipe('Fried Rice',
      'Fried rice is a dish of cooked rice',
      'https://i1.wp.com/www.mrspskitchen.net/wp-content/uploads/20171004-_TDP0298.jpg',
      [
        new Ingredient('rice', 1),
        new Ingredient('carrot', 2)
      ]

    )
  ];
  constructor(private sl: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.sl.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChange.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChange.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChange.next(this.recipes);
  }
}
