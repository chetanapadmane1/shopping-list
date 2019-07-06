import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipe: Recipe[];

  constructor(private rs: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.rs.recipesChange.subscribe((newRecipes: Recipe[]) => this.recipe = newRecipes);
    this.recipe = this.rs.getRecipes();
  }
  goToNewRecipe() {
    console.log('goToNewRecipe')
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
