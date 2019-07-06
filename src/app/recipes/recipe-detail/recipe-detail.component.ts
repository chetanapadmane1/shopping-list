import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from 'src/app/recipes/recipe';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private rs: RecipeService, private route: ActivatedRoute, private router: Router, private dss: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.rs.getRecipe(this.id);
    });
  }

  addToShoppingList() {
    this.rs.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  goToEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  goToDeleteRecipe() {
    this.rs.deleteRecipe(this.id);
    this.dss.storeRecipes();
    this.router.navigate(['recipes']);
  }
}
