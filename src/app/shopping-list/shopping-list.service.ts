import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  newIngredients = new Subject<Ingredient[]>();
  selectEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10)
  ];
  constructor() { }
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    console.log('call from service');
    this.ingredients.push(ingredient);
    this.newIngredients.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.newIngredients.next(this.ingredients.slice());
  }
  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.newIngredients.next(this.ingredients.slice());
  }
  deleteIngredient(index: number){
    this.ingredients.splice(index,1)
    this.newIngredients.next(this.ingredients.slice());
  }
}
