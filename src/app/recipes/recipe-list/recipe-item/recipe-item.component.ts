import { Component, OnInit,Input } from '@angular/core';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from 'src/app/recipes/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  @Input() recipeIndex:number;
  constructor(private rs: RecipeService) { }

  ngOnInit() {
    console.log(this.recipeIndex)
  }
  
}
