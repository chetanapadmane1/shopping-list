import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Form, FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private rs: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForms();
      }
    );
    console.log(this.editMode);
  }

  onSubmit() {
    if (this.editMode) {
      this.rs.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.rs.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

  private initForms() {
    console.log('init form');
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    const reciptIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.rs.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          reciptIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDesc),
      ingredients: reciptIngredients
    });
  }
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
