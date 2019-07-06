import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private rs: RecipeService) {

    }

    storeRecipes() {
        const recipes = this.rs.getRecipes();
        this.http.put('https://recipe-shopping-list-ef129.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }
    fetchRecipes() {
        this.http
            .get<Recipe[]>(
                'https://recipe-shopping-list-ef129.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }))
            .subscribe(response => {
                this.rs.setRecipes(response);
            });
    }
}
