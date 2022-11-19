import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipeModel } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipes.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{

    constructor(private http:HttpClient,private recipeService:RecipeService,
        private authService:AuthService){

    }
    storeRecipes(){
        const recipes = this.recipeService.getRecipe();
        this.http.put('https://ng-myproject-2240a-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(response =>{
            console.log(response);
            
        })
    }
    fetchRecipes(){
                return this.http
                    .get<RecipeModel[]>('https://ng-myproject-2240a-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
            map(recipes =>{
                return recipes.map(recipe => {
                return {
                ...recipe,
                ingredients:recipe.ing? recipe.ing : []
                };
            });
        }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes)
            })
            )
        
    }


}