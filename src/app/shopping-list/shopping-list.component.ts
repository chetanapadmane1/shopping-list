import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';
import {  } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  private ingredients: Ingredient[];
  private subscription: Subscription
  constructor(private sl: ShoppingListService) { }

  ngOnInit() {
    console.log('shopping list loaded');
    this.ingredients = this.sl.getIngredients();
    this.subscription = this.sl.newIngredients.subscribe(newIngredients => this.ingredients = newIngredients)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onEditItem(index:number){
    this.sl.selectEditing.next(index);
  }
}
